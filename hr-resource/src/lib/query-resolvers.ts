import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import dayjs from "dayjs";
import { GraphQLError } from "graphql";
import { PaymentStatus, QueryResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";


export const qResolverUser: QueryResolvers['user'] = async (
  _root,
  { id, options },
  { organization, roles },
) => {
  const mixedUserDocument = await prisma.user.findUnique({
    where: {
      id,
      organizationId: roles.includes("SUPER") ? undefined : organization?.id,
    },
    include: {
      UserRoleMap: true,
      organization: true,
      position: true,
      UserScheduleMap: {
        include: {
          schedule: true,
          position: true,
        },
        where: {
          schedule: {
            organizationId: roles.includes("SUPER") ? undefined : organization?.id,
            dateTimeStart: { gte: options?.scheduleFilters?.from, lte: options?.scheduleFilters?.to },
            dateTimeEnd: { gte: options?.scheduleFilters?.from, lte: options?.scheduleFilters?.to },
          },
        }
      },
    },
  });

  if (!mixedUserDocument) {
    throw new GraphQLError(`User with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } });
  };

  const { UserRoleMap, UserScheduleMap, ...user } = mixedUserDocument;

  return {
    ...user,
    roles: UserRoleMap.map(({ role }) => role as Role),
    schedules: UserScheduleMap.map(schedule => ({
      ...schedule,
      user: { ...user, syncStatus: user.syncStatus as SyncStatus },
    })),
    syncStatus: mixedUserDocument.syncStatus as SyncStatus,
  };
}

export const qResolverCurrentUser: QueryResolvers['currentUser'] = async (
  _root,
  { options },
  context,
  info
) => qResolverUser(
  _root,
  { id: context.user?.id, options },
  context,
  info
);

export const qResolverUsers: QueryResolvers['users'] = async (
  _root,
  { options },
  { organization, roles }
) => {
  const users = await prisma.user.findMany({
    include: {
      UserRoleMap: true,
      position: true,
      organization: true
    },
    where: {
      organizationId: roles.includes("SUPER") ? undefined : organization?.id,
      ...(options?.searchTerm
        ? {
          OR: [
            { firstName: { contains: options.searchTerm } },
            { middleName: { contains: options.searchTerm } },
            { lastName: { contains: options.searchTerm } },
            { email: { contains: options.searchTerm } },
            { phone: { contains: options.searchTerm } },
            { streetName: { contains: options.searchTerm } },
            { addressL2: { contains: options.searchTerm } },
            { city: { contains: options.searchTerm } },
            { province: { contains: options.searchTerm } },
            { country: { contains: options.searchTerm } },
            { pincode: { contains: options.searchTerm } },
          ]
        }
        : {}
      ),
      UserRoleMap: {
        some: {
          role: { in: options?.roles ?? undefined }
        }
      }
    },
    take: options?.limit ?? undefined,
  });

  return users.map(({ UserRoleMap, syncStatus, ...user }) => ({
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: syncStatus as SyncStatus,
    ...user
  }));
}

export const qResolverSchedule: QueryResolvers['schedule'] = async (
  _root,
  { id },
  { roles, organization }
) => {
  const mixedSchedule = await prisma.schedule
    .findUnique({
      include: {
        createdBy: true,
        organization: true,
        UserScheduleMap: {
          include: {
            user: true,
            position: true,
          },
        }
      },
      where: {
        id,
        organizationId: roles.includes("SUPER") ? undefined : organization?.id,
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') { throw new GraphQLError(`Schedule with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } }) }
      }
      throw error
    });

  if (!mixedSchedule) {
    throw new GraphQLError(`Schedule with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } });
  };

  const { UserScheduleMap, createdBy, ...schedule } = mixedSchedule;
  return {
    ...schedule,
    ...(createdBy && { createdBy: { ...createdBy, syncStatus: createdBy.syncStatus as SyncStatus } }),
    employees: UserScheduleMap.map(({ user, position }) => ({
      ...user,
      position: position ?? null,
      syncStatus: user.syncStatus as SyncStatus
    }))
  };
}

export const qResolverSchedules: QueryResolvers['schedules'] = async (
  _root,
  { filters },
  { roles, organization }
) => {
  const schedules = await prisma.schedule
    .findMany({
      include: {
        createdBy: true,
        organization: true,
        UserScheduleMap: {
          include: {
            user: true,
            position: true,
          },
        }
      },
      where: {
        organizationId: roles.includes("SUPER") ? undefined : organization?.id,
        ...(filters?.title
          ? {
            OR: [
              { title: { contains: filters.title } },
            ]
          }
          : {}
        ),
        dateTimeStart: { gte: filters?.from, lte: filters?.to },
        dateTimeEnd: { gte: filters?.from, lte: filters?.to },
      },
      take: filters?.pagination?.take ?? undefined,
      skip: filters?.pagination?.skip ?? undefined,
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query schedules', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return schedules.map(({ UserScheduleMap, createdBy, ...schedule }) => ({
    ...schedule,
    ...(createdBy && { createdBy: { ...createdBy, syncStatus: createdBy.syncStatus as SyncStatus } }),
    employees: UserScheduleMap.map(({ user, position }) => ({
      ...user,
      position: position ?? null,
      syncStatus: user.syncStatus as SyncStatus
    }))
  }));
}

export const qResolverScheduledShifts: QueryResolvers['scheduledShifts'] = async (
  _root,
  { filters },
  { roles, organization },
) => {
  const mixedScheduleDocument = await prisma.userScheduleMap
    .findMany({
      include: {
        user: {
          include: {
            position: true,
            UserRoleMap: true,
          },
        },
        schedule: true,
        position: true,
      },
      where: {
        userId: filters?.userId ?? undefined,
        user: { organizationId: roles.includes("SUPER") ? undefined : organization?.id },
        schedule: {
          organizationId: roles.includes("SUPER") ? undefined : organization?.id,
          dateTimeStart: { gte: filters?.from, lte: filters?.to },
          dateTimeEnd: { gte: filters?.from, lte: filters?.to },
        },
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query shifts', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return mixedScheduleDocument.map(({ user, ...schedule }) => ({
    ...schedule,
    user: {
      ...user,
      syncStatus: user.syncStatus as SyncStatus,
    },
  }));
}

export const qResolverPunches: QueryResolvers['punches'] = async (
  _root,
  { filter },
  { user, roles, organization },
) => {
  const active = await prisma.clockTime
    .findMany({
      include: {
        user: {
          include: {
            position: true,
            UserRoleMap: true,
          },
        },
      },
      where: {
        user: {
          organizationId: roles.includes("SUPER")
            ? undefined
            : organization?.id
        },
        userId: roles.every(role => role !== "EMPLOYEE")
          ? user?.id
          : filter?.userId ?? undefined,
        AND: {
          startTime: { lte: dayjs().toISOString() },
          endTime: null
        },
      },
      take: filter?.pageSize ?? undefined,
      skip: filter?.pageNumber ?? undefined,
    });

  const history = await prisma.clockTime
    .findMany({
      include: {
        user: {
          include: {
            position: true,
            UserRoleMap: true,
          },
        },
      },
      where: {
        userId: (
          roles.includes("SUPER") ||
          roles.includes("ADMIN") ||
          roles.includes("MANAGER") ||
          roles.includes("LEAD")
        ) ? undefined : user.id,
        user: {
          organizationId: roles.includes("SUPER")
            ? undefined
            : organization?.id
        },
        id: {
          notIn: active.map(({ id }) => id)
        },
        paymentStatus: { in: filter?.paymentStatus ?? undefined },
      },
      take: filter?.pageSize ?? undefined,
      skip: filter?.pageNumber ?? undefined,
    });

  return {
    active: active.map(({ user, ...clockTime }) => ({
      ...clockTime,
      earning: new Decimal(dayjs().diff(clockTime.startTime, 'hour') * clockTime.hourlyWage.toNumber()),
      paymentStatus: clockTime.paymentStatus as PaymentStatus,
      user: {
        ...user,
        syncStatus: user.syncStatus as SyncStatus,
      },
    })),
    history: history.map(({ user, ...clockTime }) => ({
      ...clockTime,
      earning: new Decimal(dayjs(clockTime.endTime).diff(clockTime.startTime, 'hour') * clockTime.hourlyWage.toNumber()),
      netHours: dayjs(clockTime.endTime).diff(clockTime.startTime, 'hour'),
      paymentStatus: clockTime.paymentStatus as PaymentStatus,
      user: {
        ...user,
        syncStatus: user.syncStatus as SyncStatus,
      },
    }))
  };
}

export const qResolverPayrolls: QueryResolvers['payrolls'] = async (
  _root,
  _args,
  { roles, organization },
) => {
  const payrolls = await prisma.payroll.findMany({
    include: {
      organization: true,
      Payslip: {
        include: {
          ClockTime: true,
          employee: {
            include: {
              position: true,
            }
          },
        }
      }
    },
    where: {
      organizationId: roles.includes("SUPER") ? undefined : organization?.id,
    },
  });

  return payrolls.map(({ Payslip, ...payroll }) => ({
    ...payroll,
    payslips: Payslip.map(({ ClockTime, ...payslip }) => ({
      ...payslip,
      employee: {
        ...payslip.employee,
        syncStatus: payslip.employee.syncStatus as SyncStatus,
      },
    }))
  }));
}

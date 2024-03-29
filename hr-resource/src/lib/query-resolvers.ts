import { Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import cronParser from "cron-parser";
import { GraphQLError } from "graphql";
import dayjs from "./dayjs.js";
import { PaymentStatus, Payroll, PayrollSummary, Payslip, PunchApprovalStatus, QueryResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";
import { clocktimeEarningReducer } from "./utilities.js";


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
  const clocktimes = await prisma.clockTime
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
          id: roles.some((role) => role === "SUPER" || role === "ADMIN" || role === "MANAGER" || role === "LEAD")
            ? undefined
            : user.id,
          organizationId: roles.includes("SUPER")
            ? undefined
            : organization?.id
        },
        startTime: { gte: filter?.from ?? undefined, lte: filter?.to ?? undefined },
        endTime: filter?.activeOnly
          ? null
          : { gte: filter?.from ?? undefined, lte: filter?.to ?? undefined },
      },
      take: filter?.pagination?.take ?? undefined,
      skip: filter?.pagination?.skip ?? undefined,
    });

  return clocktimes.map(({ user, ...clockTime }) => ({
    ...clockTime,
    approvalStatus: clockTime.approvalStatus as PunchApprovalStatus,
    earning: new Decimal(dayjs(clockTime.endTime).diff(clockTime.startTime, 'hour') * clockTime.hourlyWage.toNumber()),
    netHours: dayjs(clockTime.endTime ?? dayjs()).diff(clockTime.startTime, 'hour'),
    user: {
      ...user,
      syncStatus: user.syncStatus as SyncStatus,
    },
  }));
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
    netOutstanding: 0,
    payslips: Payslip.map(({ ClockTime, paymentStatus, ...payslip }) => ({
      ...payslip,
      netPay: 0,
      paymentStatus: paymentStatus as PaymentStatus,
      employee: {
        ...payslip.employee,
        syncStatus: payslip.employee.syncStatus as SyncStatus,
      },
    }))
  }));
}

export const qResolverPayrollPeriods: QueryResolvers['payrollPeriods'] = async (
  _root,
  _args,
  { roles, organization },
) => {
  if (!organization.payrollCron) {
    return null;
  }
  const payrollPeriods = cronParser.parseExpression(
    organization.payrollCron,
    {
      startDate: dayjs().startOf('month').toDate(),
      currentDate: dayjs().toDate(),
      tz: 'UTC',
    }
  );
  return {
    startsOn: payrollPeriods.prev().toDate(),
    endsOn: payrollPeriods.next().toDate(),
  }
}

export const qResolverPayslips: QueryResolvers['payslips'] = async (
  _root,
  { filter },
  { user, roles, organization },
) => {
  const currentPayrollPeriod = cronParser.parseExpression(organization.payrollCron, {
    startDate: organization.payrollStart ?? dayjs().startOf('month').toDate(),
    currentDate: dayjs().toDate(),
    tz: 'UTC',
  });

  const payrollPeriodStart = currentPayrollPeriod.prev().toDate();
  const payrollPeriodEnd = currentPayrollPeriod.next().toDate();

  const payslips = await prisma.payslip
    .findMany({
      include: {
        employee: {
          include: {
            position: true,
          }
        },
        ClockTime: true
      },
      where: {
        employeeId: roles.every((role) => role !== "EMPLOYEE") ? filter?.employeeId ?? undefined : user.id,
        ...(filter?.onlyCurrentPeriod
          ? {
          periodStart: { gte: payrollPeriodStart, lte: payrollPeriodEnd },
          periodEnd: { gte: payrollPeriodStart, lte: payrollPeriodEnd },
          }
          : {}
        ),
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError(``, { extensions: { code: 'NOT_FOUND' } })
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query payslips', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    });

  return payslips.map(({ ClockTime, paymentStatus, ...payslip }) => ({
    ...payslip,
    netPay: 0,
    paymentStatus: paymentStatus as PaymentStatus,
    clockTimes: ClockTime.map(clockTime => ({
      ...clockTime,
      approvalStatus: clockTime.approvalStatus as PunchApprovalStatus
    })),
    employee: {
      ...payslip.employee,
      syncStatus: payslip.employee.syncStatus as SyncStatus,
    },
  }));
}

export const qResolverPayrollsIndex: QueryResolvers['payrollsIndex'] = async (
  _root,
  _args,
  { roles, organization },
) => {

  if (!roles.some(role => role === "MANAGER" || role === "LEAD")) {
    throw new GraphQLError(`User does not have permission to access this resource`, { extensions: { code: 'FORBIDDEN' } })
  }

  const currentCycle = cronParser.parseExpression(organization.payrollCron, {
    startDate: organization.payrollStart ?? dayjs().startOf('month').toDate(),
    currentDate: dayjs().toDate(),
    tz: 'UTC',
  });

  const currentCycleStart = currentCycle.prev().toDate();
  const currentCycleEnd = currentCycle.next().toDate();

  const amountOutstanding = await prisma.payslip
    .findMany({
      where: {
        employee: { organizationId: organization.id },
        periodStart: { gte: currentCycleStart, lte: currentCycleEnd },
        periodEnd: { gte: currentCycleStart, lte: currentCycleEnd },
      },
      include: {
        ClockTime: true
      }
    })
    .then(payslips => {
      return payslips.reduce(
        (payslipAmountAccumulator, { ClockTime }) => payslipAmountAccumulator.add(
          ClockTime.reduce(clocktimeEarningReducer, new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP))
        ),
        new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      )
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError(``, { extensions: { code: 'NOT_FOUND' } })
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query payrolls', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    });

  const previousPayrolls: Array<Payroll> = await prisma.payroll.findMany({
    where: {
      periodEnd: {
        lt: currentCycleStart
      },
      organizationId: roles.includes("SUPER") ? undefined : organization?.id,
    },
    include: {
      Payslip: {
        include: {
          ClockTime: true
        }
      }
    },
    orderBy: {
      periodEnd: 'desc'
    },
    take: 7
  }).then(payrolls => payrolls.map(payroll => ({
    ...payroll,
    netOutstanding: payroll.Payslip.reduce(
      (acc, { ClockTime }) => acc.add(ClockTime.reduce(
        (acc, clockTime) => acc + (dayjs(clockTime.endTime).diff(clockTime.startTime, 'hour') * clockTime.hourlyWage.toNumber()),
        0
      )),
      new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    ),
  })));

  const activePayslips: Array<Payslip> = await prisma.payslip.findMany({
    where: {
      periodStart: {
        gte: currentCycleStart,
        lte: currentCycleEnd
      },
      periodEnd: {
        gte: currentCycleStart,
        lte: currentCycleEnd
      },
      employee: {
        organizationId: roles.includes("SUPER") ? undefined : organization?.id,
      }
    },
    include: {
      employee: true,
      ClockTime: true
    }
  })
    .then(payslips => payslips.map(({ ClockTime, employee, paymentStatus, ...payslip }) => ({
      ...payslip,
      netPay: ClockTime.reduce(
        clocktimeEarningReducer,
        new Decimal(0).toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
      ),
      employee: {
        ...employee,
        syncStatus: employee.syncStatus as SyncStatus
      },
      paymentStatus: paymentStatus as PaymentStatus,
    })))
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError(``, { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      logSystem.error(error);
      throw new GraphQLError('Could not query payrolls', { extensions: { code: 'INTERNAL_SERVER_ERROR' } })
    });

  const currentPayrollSummary: PayrollSummary | null = await prisma.payroll.findUnique({
    where: {
      organizationId_periodStart_periodEnd: {
        organizationId: organization.id,
        periodStart: currentCycleStart,
        periodEnd: currentCycleEnd
      }
    },
    include: {
      Payslip: {
        include: {
          ClockTime: true
        }
      }
    }
  }).then(payroll => {
    if (!payroll) return null;
    const { Payslip } = payroll;
    return {
      payrollId: payroll.id,
      periodStart: payroll.periodStart,
      periodEnd: payroll.periodEnd,
      totalTasks: payroll.Payslip.length,
      pendingTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'PENDING').length,
      completedTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'COMPLETED').length,
      rejectedTasks: Payslip.filter(({ paymentStatus }) => paymentStatus === 'CANCELED').length,
    }
  });

  return {
    week: dayjs().week(),
    year: dayjs().year(),
    currentCycleStart: currentCycleStart,
    currentCycleEnd: currentCycleEnd,
    amountOutstanding,
    previousPayrolls,
    activePayslips,
    currentPayrollSummary,
  }
}

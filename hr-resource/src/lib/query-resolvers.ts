import { Prisma } from "@prisma/client";
import { GraphQLError } from "graphql";
import { QueryResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";
import dayjs from "dayjs";


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
      UserPositionMap: { include: { position: true } },
      UserRoleMap: true,
      organization: true,
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

  const { UserRoleMap, UserPositionMap, UserScheduleMap, ...user } = mixedUserDocument;

  return {
    ...user,
    positions: UserPositionMap.map(({ position }) => position),
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
      UserPositionMap: {
        include: { position: true },
      },
      UserRoleMap: true,
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

  return users.map(({ UserRoleMap, UserPositionMap, syncStatus, ...user }) => ({
    positions: UserPositionMap.map(({ position }) => position),
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: syncStatus as SyncStatus,
    ...user
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
            UserPositionMap: { include: { position: true } },
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

export const qResolverListPunches: QueryResolvers['listPunches'] = async (
  _root,
  { filter },
  { user, roles, organization },
) => {
  const activePunch = await prisma.clockTime
    .findFirst({
      where: {
        userId: user.id,
        AND: {
          startTime: { lte: dayjs().toISOString() },
          endTime: null
        },
      }
    });

  const history = await prisma.clockTime
    .findMany({
      include: {
        user: {
          include: {
            UserPositionMap: { include: { position: true } },
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
        user: { organizationId: roles.includes("SUPER") ? undefined : organization?.id },
        id: { not: activePunch?.id },
      },
    });

  return {
    activePunch,
    history
  };
}

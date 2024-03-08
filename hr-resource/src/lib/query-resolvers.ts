import { GraphQLError } from "graphql";
import { QueryResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import { logSystem } from "./logger.js";
import prisma from "./prisma.js";

export const qResolverCurrentUser: QueryResolvers['currentUser'] = async (
  _root,
  _args,
  { user, organization, positions, roles }
) => ({
  ...user,
  positions,
  organization,
  roles: roles.map(role => role as Role),
  syncStatus: user.syncStatus as SyncStatus,
});

export const qResolverUsers: QueryResolvers['users'] = async (
  _root,
  _args,
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
    where: { organizationId: roles.includes("SUPER") ? undefined : organization?.id },
  });

  return users.map(({ UserRoleMap, UserPositionMap, syncStatus, ...user }) => ({
    positions: UserPositionMap.map(({ position }) => position),
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: syncStatus as SyncStatus,
    ...user
  }));
}

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
      UserPositionMap: { include: { position: !!options?.positons } },
      UserRoleMap: !!options?.roles,
      organization: !!options?.organization,
      Schedule: { include: { position: !!options?.positons } },
      TimeSheet: !!options?.timesheets,
    },
  });

  if (!mixedUserDocument) {
    throw new GraphQLError(`User with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } });
  };

  const { UserRoleMap, UserPositionMap, Schedule, TimeSheet, ...user } = mixedUserDocument;

  return {
    ...user,
    ...(options?.positons
      ? { positions: UserPositionMap.map(({ position }) => position) }
      : {}
    ),
    ...(options?.roles ? { roles: UserRoleMap.map(({ role }) => role as Role) } : {}),
    ...(options?.schedules ? { schedules: Schedule } : {}),
    ...(options?.timesheets ? { timesheets: TimeSheet } : {}),
    syncStatus: mixedUserDocument.syncStatus as SyncStatus,
  };
}

export const qResolverScheduledShifts: QueryResolvers['scheduledShifts'] = async (
  _root,
  { filters },
  { roles, organization },
) => {
  const mixedScheduleDocument = await prisma.schedule
    .findMany({
      include: {
        position: true,
        user: {
          include: {
            UserPositionMap: { include: { position: true } },
            UserRoleMap: true,
          },
        },
      },
      where: {
        userId: filters?.userId,
        user: { organizationId: roles.includes("SUPER") ? undefined : organization?.id },
        dateTimeStart: { gte: filters?.from },
        dateTimeEnd: { lte: filters?.to },
      },
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not query shifts', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return mixedScheduleDocument.map(({ user, ...shift }) => ({
    ...shift,
    user: user && {
      ...user,
      positions: user.UserPositionMap.map(({ position }) => position),
      roles: user.UserRoleMap.map(({ role }) => role as Role),
      syncStatus: user.syncStatus as SyncStatus,
    }
  }));
}

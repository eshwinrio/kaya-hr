import { GraphQLError } from "graphql";
import { QueryResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";

export const qResolverCurrentUser: QueryResolvers['currentUser'] = async (
  _root,
  _args,
  { user, organization, positions, roles }
) => ({
  ...user,
  roles: roles.map(role => role as Role),
  positions: positions.map(position => ({ ...position, hourlyWage: position.hourlyWage.toNumber() })),
  organization,
  syncStatus: user.syncStatus as SyncStatus,
  dateJoined: user.dateJoined.toISOString(),
  dateOfBirth: user.dateOfBirth.toISOString(),
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

  return users.map(({ UserRoleMap, UserPositionMap, dateOfBirth, dateJoined, syncStatus, ...user }) => ({
    positions: UserPositionMap.map(({ position }) => ({ ...position, hourlyWage: position.hourlyWage.toNumber() })),
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: syncStatus as SyncStatus,
    dateOfBirth: dateOfBirth.toISOString(),
    dateJoined: dateJoined.toISOString(),
    ...user
  }));
}

export const qResolverUser: QueryResolvers['user'] = async (
  _root,
  { id },
  _context
) => {
  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      UserPositionMap: {
        include: { position: true },
      },
      UserRoleMap: true,
      organization: true
    },
  });

  if (!user) {
    throw new GraphQLError(`User with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } });
  };
  
  return {
    ...user,
    positions: user.UserPositionMap.map(({ position }) => ({ ...position, hourlyWage: position.hourlyWage.toNumber() })),
    roles: user.UserRoleMap.map(({ role }) => role as Role),
    syncStatus: user.syncStatus as SyncStatus,
    dateOfBirth: user.dateOfBirth.toISOString(),
    dateJoined: user.dateJoined.toISOString(),
  };
}

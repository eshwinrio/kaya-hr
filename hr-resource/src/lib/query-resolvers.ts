import { GraphQLError } from "graphql";
import { QueryResolvers } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";

export const qResolverCurrentUser: QueryResolvers['currentUser'] = async (
  _root,
  _args,
  { user, organization, roles }
) => ({
  ...user,
  roles: roles.map(role => ({ ...role, hourlyWage: role.hourlyWage.toNumber() })),
  organization,
  dateJoined: user.dateJoined.toISOString(),
  dateOfBirth: user.dateOfBirth.toISOString(),
});

export const qResolverRoles: QueryResolvers['roles'] = async (_root, _args, { roles }) => await prisma.role
  .findMany()
  .then(roles => roles.map(role => ({ ...role, hourlyWage: role.hourlyWage.toNumber() })));

export const qResolverUsers: QueryResolvers['users'] = async (
  _root,
  _args,
  _context
) => {
  const users = await prisma.user.findMany({
    include: {
      UserRoles: {
        include: { role: true },
        where: { roleId: { not: 1 } }
      },
      organization: true
    }
  });

  return users.map(({ UserRoles, dateOfBirth, dateJoined, ...user }) => ({
    roles: UserRoles.map(({ role }) => ({ ...role, hourlyWage: role.hourlyWage.toNumber() })),
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
      UserRoles: {
        include: { role: true },
        where: { roleId: { not: 1 } }
      },
      organization: true
    }
  });

  if (!user) {
    throw new GraphQLError(`User with id ${id} not found`, { extensions: { code: 'NOT_FOUND' } });
  };
  
  return {
    ...user,
    roles: user.UserRoles.map(({ role }) => ({ ...role, hourlyWage: role.hourlyWage.toNumber() })),
    dateOfBirth: user.dateOfBirth.toISOString(),
    dateJoined: user.dateJoined.toISOString()
  };
}

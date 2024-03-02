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

export const qResolverRoles: QueryResolvers['roles'] = async (_root, _args, { roles }) => await prisma.roles
  .findMany()
  .then(roles => roles.map(role => ({ ...role, hourlyWage: role.hourlyWage.toNumber() })));

export const qResolverUsers: QueryResolvers['users'] = async (
  _root,
  _args,
  _context
) => {
  const users = await prisma.users.findMany({
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

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

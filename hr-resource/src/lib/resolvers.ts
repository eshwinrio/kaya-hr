import { GraphQLError } from "graphql";
import { Maybe, MutationResolvers, QueryResolvers, Resolver } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";
import validator from "validator";

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

export const mResolverCreateUser: MutationResolvers['createUser'] = async (
  _root,
  { input },
  { user, organization, roles }
) => {
  if (!validator.isEmail(input.email)) {
    throw new GraphQLError('Invalid email format', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  if (!input.firstName.trim()) {
    throw new GraphQLError('First name is required', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  if (!input.lastName.trim()) {
    throw new GraphQLError('Last name is required', { extensions: { code: 'BAD_USER_INPUT' } });
  }

  // If user with same email already exists
  if (await prisma.users.findUnique({ where: { email: input.email } })) {
    throw new GraphQLError('User with same email already exists', { extensions: { code: 'CONFLICT' } });
  }

  return await prisma.users
    .create({
      data: {
        firstName: input.firstName,
        middleName: input.middleName,
        lastName: input.lastName,
        email: input.email,
        dateOfBirth: new Date(input.dateOfBirth),
        dateJoined: new Date(input.dateJoined),
        city: input.city,
        country: input.country,
        phone: input.phone,
        pincode: input.pincode,
        province: input.province,
        streetName: input.streetName,
        addressL2: input.addressL2,
        organization: { connect: { id: organization?.id } },
        UserRoles: { createMany: { data: input.roleIds?.map(roleId => ({ roleId })) ?? [] } },
      },
    })
    .then(user => user.id);
};

import { GraphQLError } from "graphql";
import { MutationResolvers } from "./gql-codegen/graphql.js";
import prisma from "./prisma.js";
import validator from "validator";
import { logHttp, logSystem } from "./logger.js";
import { syncUsers } from "./fetch-requests.js";
import createHttpError from "http-errors";

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
  if (await prisma.user.findUnique({ where: { email: input.email } })) {
    throw new GraphQLError('User with same email already exists', { extensions: { code: 'CONFLICT' } });
  }

  return prisma.user
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
    .then(user => user.id)
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not create user', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });
};

export const mResolverSyncUsers: MutationResolvers['syncUsers'] = async (
  _root,
  { force },
  { applicationId, accessToken, organization }
) => {
  const pendingUsers = await prisma.user
    .findMany({
      where: {
        organizationId: organization?.id,
        syncStatus: force ? undefined : 'NEVER',
      },
      select: {
        firstName: true,
        middleName: true,
        lastName: true,
        email: true,
      }
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not query users', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  headers.append('X-Application', applicationId);
  headers.append('Cookie', `access_token=${accessToken}`);
  const syncResponse = await syncUsers(pendingUsers, Boolean(force), { headers }).catch(error => {
    if (createHttpError.isHttpError(error)) {
      logHttp.error(error);
      throw new GraphQLError(error.message, { extensions: { code: error.statusCode } });
    }
    logSystem.error(error);
    throw new GraphQLError('Could not sync users', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
  });

  if (!syncResponse.ok) {
    throw new GraphQLError('Could not sync users', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
  }

  const response = await syncResponse.json() as { accepted: Array<string>, rejected: Array<string> };
  const [accepted, rejected] = await prisma.$transaction([
    prisma.user.updateMany({
      where: { email: { in: response.accepted } },
      data: { syncStatus: 'OK' }
    }),
    prisma.user.updateMany({
      where: { email: { in: response.rejected } },
      data: { syncStatus: 'FAIL' }
    }),
  ]).catch(error => {
    logSystem.error('Failed to record sync status', error);
    throw new GraphQLError('Failed to record sync status', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
  });

  return { accepted: accepted.count, rejected: rejected.count };
};

import { GraphQLError } from "graphql";
import createHttpError from "http-errors";
import validator from "validator";
import { Seed } from "../config/environment.js";
import { syncUsers } from "./fetch-requests.js";
import { MutationResolvers } from "./gql-codegen/graphql.js";
import { logHttp, logSystem } from "./logger.js";
import prisma from "./prisma.js";
import { Prisma } from "@prisma/client";

export const mResolverCreateUser: MutationResolvers['createUser'] = async (
  _root,
  { input },
  { organization }
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
        dateOfBirth: input.dateOfBirth,
        dateJoined: input.dateJoined,
        city: input.city,
        country: input.country,
        phone: input.phone,
        pincode: input.pincode,
        province: input.province,
        streetName: input.streetName,
        addressL2: input.addressL2,
        organization: { connect: { id: organization?.id } },
        UserRoleMap: { createMany: { data: input.roles?.map(role => ({ role })) ?? [] } },
        UserPositionMap: { createMany: { data: input.positionIds?.map(positionId => ({ positionId })) ?? [] } },
      },
    })
    .then(user => user.id)
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not create user', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });
};

export const mResolverCreateOrganization: MutationResolvers['createOrganization'] = async (
  _root,
  { input },
  { roles },
) => {
  if (!roles.includes("SUPER")) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHORIZED' } });
  }
  try {
    const organization = await prisma.organization
      .create({
        data: {
          name: input.name,
          summary: input.summary,
          webUrl: input.webUrl,
          logoUrl: input.logoUrl,
          bannerUrl: input.bannerUrl,
        },
      });
    return organization.id;
  } catch (error) {
    logSystem.error(error);
    throw new GraphQLError('Could not create organization', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
  }
}

export const mResolverUpdateOrganization: MutationResolvers['updateOrganization'] = async (
  _root,
  { id, input },
  { roles }
) => {
  // TODO: Add a check to only allow org admins to update
  if (!roles.includes("SUPER")) {
    throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHORIZED' } });
  }
  return prisma.organization
    .update({
      where: { id },
      data: {
        name: input.name ?? undefined,
        summary: input.summary,
        webUrl: input.webUrl,
        logoUrl: input.logoUrl,
        bannerUrl: input.bannerUrl,
      },
    })
    .then(organization => organization.id)
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not update organization', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });
}

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
  const syncResponse = await syncUsers(pendingUsers.map(user => ({ ...user, password: Seed.defaultUserPassword! })), Boolean(force), { headers }).catch(error => {
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

export const mResolverScheduleShiftFor: MutationResolvers['scheduleShiftFor'] = async (
  _root,
  { userId, input },
  _context
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new GraphQLError('User not found', { extensions: { code: 'NOT_FOUND' } });
  }

  const position = await prisma.position.findUnique({ where: { id: input.positionId } });
  if (!position) {
    throw new GraphQLError('Designated position not found', { extensions: { code: 'NOT_FOUND' } });
  }

  const collidingSchedules = await prisma.schedule
    .findMany({
      where: {
        positionId: input.positionId,
        dateTimeStart: { gte: new Date(input.dateTimeStart) },
        dateTimeEnd: { lte: new Date(input.dateTimeEnd) },
      },
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not query schedules', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  if (collidingSchedules.length > 0) {
    throw new GraphQLError('Colliding schedules found', {
      extensions: {
        code: 'CONFLICT',
        details: collidingSchedules.map(schedule => ({
          id: schedule.id,
          positionId: schedule.positionId,
          dateTimeStart: schedule.dateTimeStart,
          dateTimeEnd: schedule.dateTimeEnd,
        })),
      }
    });
  }

  return prisma.schedule
    .create({
      data: {
        dateTimeStart: new Date(input.dateTimeStart),
        dateTimeEnd: new Date(input.dateTimeEnd),
        user: { connect: { id: userId } },
        position: { connect: { id: input.positionId } },
      }
    })
    .then(shift => shift.id)
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      throw new GraphQLError('Could not schedule shift', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });
}

import { Prisma, Role as PrismaRole } from "@prisma/client";
import { GraphQLError } from "graphql";
import createHttpError from "http-errors";
import validator from "validator";
import { Seed } from "../config/environment.js";
import { syncUsers } from "./fetch-requests.js";
import { MutationResolvers, Role, SyncStatus } from "./gql-codegen/graphql.js";
import { logHttp, logSystem } from "./logger.js";
import prisma from "./prisma.js";

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

  const mixedUserDocument = await prisma.user
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
        organization: {
          connect: { id: organization?.id }
        },
        UserRoleMap: {
          createMany: {
            data: input.roles?.map(role => ({ role })) ?? []
          }
        },
        UserPositionMap: {
          createMany: {
            data: input.positionIds?.map(positionId => ({ positionId })) ?? []
          }
        },
      },
      include: {
        UserRoleMap: true,
        UserPositionMap: { include: { position: true } },
        organization: true,
      }
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not create user', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  const { UserPositionMap, UserRoleMap, ...user } = mixedUserDocument;
  return {
    ...user,
    positions: UserPositionMap.map(({ position }) => position),
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: user.syncStatus as SyncStatus,
  }
};

export const mResolverUpdateUser: MutationResolvers['updateUser'] = async (
  _root,
  { userId, input },
  { organization }
) => {
  // Ensure that user exists
  if (!(await prisma.user.findUnique({ where: { id: userId } }))) {
    throw new GraphQLError('User doesn\'t exist', { extensions: { code: 'NOT_FOUND' } });
  }

  const mixedUserDocument = await prisma.user
    .update({
      data: {
        firstName: input.firstName ?? undefined,
        middleName: input.middleName,
        lastName: input.lastName ?? undefined,
        dateOfBirth: input.dateOfBirth,
        dateJoined: input.dateJoined,
        city: input.city ?? undefined,
        country: input.country ?? undefined,
        phone: input.phone ?? undefined,
        pincode: input.pincode ?? undefined,
        province: input.province ?? undefined,
        streetName: input.streetName ?? undefined,
        addressL2: input.addressL2 ?? undefined,
        ...(input.roles
          ? {
            UserRoleMap: {
              deleteMany: {
                AND: {
                  userId,
                  role: { notIn: input.roles ?? undefined }
                }
              },
              upsert: input.roles.map(role => ({
                create: {
                  role: role as PrismaRole
                },
                update: {},
                where: {
                  userId_role: {
                    userId, role: role as PrismaRole
                  }
                }
              }))
            }
          }
          : {}
        ),
        ...(input.positionIds?.length
          ? {
            UserPositionMap: {
              deleteMany: {
                AND: {
                  userId,
                  positionId: { notIn: input.positionIds ?? undefined }
                }
              },
              upsert: input.positionIds.map(positionId => ({
                create: {
                  position: {
                    connect: { id: positionId },
                  },
                },
                update: {},
                where: {
                  userId_positionId: {
                    userId, positionId
                  }
                }
              }))
            }
          }
          : {}
        )
      },
      where: { id: userId },
      include: {
        UserRoleMap: true,
        UserPositionMap: { include: { position: true } },
        organization: true,
      }
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not create user', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  const { UserPositionMap, UserRoleMap, ...user } = mixedUserDocument;
  return {
    ...user,
    positions: UserPositionMap.map(({ position }) => position),
    roles: UserRoleMap.map(({ role }) => role as Role),
    syncStatus: user.syncStatus as SyncStatus,
  }
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
    return await prisma.organization
      .create({
        data: {
          name: input.name,
          summary: input.summary,
          webUrl: input.webUrl,
          logoUrl: input.logoUrl,
          bannerUrl: input.bannerUrl,
        },
      });
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

export const mResolverCreateSchedule: MutationResolvers['createSchedule'] = async (
  _root,
  { input },
  { organization, user }
) => {
  const collidingSchedules = await prisma.userScheduleMap
    .findMany({
      include: { schedule: true },
      where: {
        schedule: {
          organizationId: organization?.id,
          dateTimeStart: { gte: new Date(input.dateTimeStart) },
          dateTimeEnd: { lte: new Date(input.dateTimeEnd) },
        },
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
        details: collidingSchedules.map(({ schedule }) => schedule),
      }
    });
  }

  const schedule = await prisma.schedule
    .create({
      data: {
        title: input.title ?? undefined,
        dateTimeStart: input.dateTimeStart,
        dateTimeEnd: input.dateTimeEnd,
        organizationId: organization?.id,
        createdByUserId: user?.id,
        createdAt: new Date(),
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      throw new GraphQLError('Could not schedule shift', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  await prisma.userScheduleMap
    .createMany({
      data: input.assignees?.map(assignee => ({
        scheduleId: schedule.id,
        userId: assignee.userId,
        positionId: assignee.positionId,
      })) ?? [],
    })
    .catch(error => {
      logSystem.error(error);
      throw new GraphQLError('Could not schedule shift', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return schedule;
}

export const mResolverUpdateSchedule: MutationResolvers['updateSchedule'] = async (
  _root,
  { scheduleId, input },
  { organization, user }
) => {
  const schedule = await prisma.schedule
    .update({
      where: { id: scheduleId },
      data: {
        title: input.title ?? undefined,
        dateTimeStart: input.dateTimeStart,
        dateTimeEnd: input.dateTimeEnd,
        organizationId: organization?.id,
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      throw new GraphQLError('Could not update shift', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return schedule;
}

export const mResolverDeleteSchedule: MutationResolvers['deleteSchedule'] = async (
  _root,
  { scheduleId },
  { organization, user }
) => {
  const schedule = await prisma.schedule
    .delete({
      where: { id: scheduleId },
      include: {
        UserScheduleMap: true,
      },
    })
    .catch(error => {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new GraphQLError('Certain records missing', { extensions: { code: 'NOT_FOUND' } });
        }
        logSystem.error(error.stack);
      }
      throw new GraphQLError('Could not delete shift', { extensions: { code: 'INTERNAL_SERVER_ERROR' } });
    });

  return schedule;
}

export const mResolverRegisterPunch: MutationResolvers['registerPunch'] = async (
  _root,
  _args,
  { user }
) => {
  const currentTime = new Date();
  const activeSchedule = await prisma.userScheduleMap.findFirst({
    where: {
      userId: user?.id,
      schedule: {
        AND: {
          dateTimeStart: { lte: currentTime },
          dateTimeEnd: { gte: currentTime },
        }
      }
    },
    include: {
      position: true,
    },
  });

  // If no open punch, create one
  const existingClockTime = await prisma.clockTime.findFirst({
    where: {
      AND: [
        { userId: user?.id },
        {endTime: null},
      ],
    },
  });
  
  if (existingClockTime) {
    return await prisma.clockTime.update({
      where: {
        id: existingClockTime.id,
      },
      data: {
        endTime: currentTime,
      },
    });
  } else {
    return await prisma.clockTime.create({
      data: {
        userId: user?.id,
        startTime: currentTime,
        hourlyWage: activeSchedule?.position.hourlyWage ?? 0,
      },
    });
  }
}

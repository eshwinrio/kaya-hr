import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { Organization, Position, Role, TimeSheet, User } from "@prisma/client";
import { readFileSync } from "fs";
import { GraphQLError } from "graphql";
import httpErrors, { HttpError } from "http-errors";
import { getHeaders, verifyIdentity } from "./fetch-requests.js";
import { Resolvers, ScheduleAssignment, SyncStatus } from "./gql-codegen/graphql.js";
import { logHttp } from "./logger.js";
import { mResolverCreateOrganization, mResolverCreateSchedule, mResolverCreateUser, mResolverDeleteSchedule, mResolverSyncUsers, mResolverUpdateOrganization, mResolverUpdateSchedule, mResolverUpdateUser } from "./mutation-resolvers.js";
import prisma from "./prisma.js";
import { qResolverCurrentUser, qResolverScheduledShifts, qResolverUser, qResolverUsers } from "./query-resolvers.js";
import { Decimal, ISODate } from "./scalars.js";

export interface ApolloServerContext extends BaseContext {
  readonly user: User;
  readonly roles: Array<Role>;
  readonly organization: Organization;
  readonly applicationId: string;
  readonly accessToken: string;
  readonly positions?: Array<Position>;
  readonly schedules?: Array<ScheduleAssignment>;
  readonly timesheets?: Array<TimeSheet>;
}

export const apolloServerContextFn: ExpressMiddlewareOptions<ApolloServerContext>['context'] = async ({ req }) => {
  try {
    // Append all headers from the request to the headers object
    const headers = getHeaders(req);

    const verificationResponse = await verifyIdentity({ headers });
    if (!verificationResponse.ok) {
      const errorBody = await verificationResponse.json() as Error;
      throw httpErrors(verificationResponse.status, errorBody.message);
    }

    const responseBody = await verificationResponse.json() as { email: string, application: string };
    const mixedUserDocument = await prisma.user.findUnique({
      where: { email: responseBody.email },
      include: {
        organization: true,
        UserRoleMap: { select: { role: true } },
        UserPositionMap: {
          include: { position: true }
        },
        UserScheduleMap: {
          include: {
            schedule: true,
            position: true
          }
        },
        TimeSheet: true
      },
    });

    if (!mixedUserDocument) {
      throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
    }

    const { organization, UserRoleMap, UserPositionMap, UserScheduleMap, TimeSheet, ...user } = mixedUserDocument;
    return {
      user,
      positions: UserPositionMap.map(({ position }) => position),
      roles: UserRoleMap.map(({ role }) => role),
      organization: organization ?? null,
      applicationId: responseBody.application,
      accessToken: req.cookies['access_token'],
      schedules: UserScheduleMap.map(schedule => ({
        ...schedule,
        user: { ...user, syncStatus: user.syncStatus as SyncStatus },
      })),
      timesheets: TimeSheet,
    };
  } catch (error) {
    if (httpErrors.isHttpError(error)) {
      throw new GraphQLError((error as HttpError).message, { extensions: { code: (error as HttpError).statusCode } });
    }
    throw new GraphQLError((error as Error).message);
  }
};

const typeDefs = readFileSync('graphql/schema.graphql', { encoding: 'utf-8' });
const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    currentUser: qResolverCurrentUser,
    users: qResolverUsers,
    user: qResolverUser,
    scheduledShifts: qResolverScheduledShifts,
  },
  Mutation: {
    createUser: mResolverCreateUser,
    updateUser: mResolverUpdateUser,
    createOrganization: mResolverCreateOrganization,
    updateOrganization: mResolverUpdateOrganization,
    syncUsers: mResolverSyncUsers,
    createSchedule: mResolverCreateSchedule,
    updateSchedule: mResolverUpdateSchedule,
    deleteSchedule: mResolverDeleteSchedule,
  },
  Decimal: Decimal,
  ISODate: ISODate,
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = {
  typeDefs,
  resolvers,
  logger: logHttp,
};
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;

import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { Organization, Role, User } from "@prisma/client";
import { readFileSync } from "fs";
import { GraphQLError } from "graphql";
import httpErrors, { HttpError } from "http-errors";
import { getHeaders, verifyIdentity } from "./fetch-requests.js";
import { Resolvers } from "./gql-codegen/graphql.js";
import { logHttp } from "./logger.js";
import { mResolverAssignUserToSchedule, mResolverCreateOrganization, mResolverCreateSchedule, mResolverCreateUser, mResolverDeleteSchedule, mResolverRegisterPunch, mResolverSyncUsers, mResolverUpdateOrganization, mResolverUpdateSchedule, mResolverUpdateUser } from "./mutation-resolvers.js";
import prisma from "./prisma.js";
import { qResolverCurrentUser, qResolverPunches, qResolverPayrolls, qResolverScheduledShifts, qResolverUser, qResolverUsers } from "./query-resolvers.js";
import { Decimal, ISODate } from "./scalars.js";

export interface ApolloServerContext extends BaseContext {
  readonly user: User;
  readonly roles: Array<Role>;
  readonly organization: Organization;
  readonly applicationId: string;
  readonly accessToken: string;
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
      },
    });

    if (!mixedUserDocument) {
      throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
    }

    const { organization, UserRoleMap, ...user } = mixedUserDocument;
    return {
      user,
      roles: UserRoleMap.map(({ role }) => role),
      organization,
      applicationId: responseBody.application,
      accessToken: req.cookies['access_token'],
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
    punches: qResolverPunches,
    payrolls: qResolverPayrolls,
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
    registerPunch: mResolverRegisterPunch,
    assignUserToSchedule: mResolverAssignUserToSchedule,
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

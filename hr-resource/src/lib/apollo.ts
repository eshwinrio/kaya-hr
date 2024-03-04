import { readFileSync } from "fs";
import httpErrors, { HttpError } from "http-errors";
import { GraphQLError } from "graphql";
import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { Organization, Role, User } from "@prisma/client";
import { Resolvers } from "./gql-codegen/graphql.js";
import { qResolverCurrentUser, qResolverRoles, qResolverUsers } from "./query-resolvers.js";
import { mResolverCreateOrganization, mResolverCreateUser, mResolverSyncUsers, mResolverUpdateOrganization } from "./mutation-resolvers.js";
import { getHeaders, verifyIdentity } from "./fetch-requests.js";
import prisma from "./prisma.js";
import { logHttp } from "./logger.js";

export interface ApolloServerContext extends BaseContext {
  readonly user: User;
  readonly applicationId: string;
  readonly accessToken: string;
  readonly organization: Organization | null;
  readonly roles: Role[];
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

    const responseBody = await verificationResponse.json() as { id: number, application: string };
    const user = await prisma.user.findUnique({
      where: { id: responseBody.id },
      include: { organization: true, UserRoles: { include: { role: true } } },
    });
    if (!user) {
      throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
    }

    const { UserRoles, organization, ...rest } = user;
    return {
      user: rest,
      applicationId: responseBody.application,
      accessToken: req.cookies['access_token'],
      organization,
      roles: UserRoles.map(userRole => userRole.role)
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
    roles: qResolverRoles,
  },
  Mutation: {
    createUser: mResolverCreateUser,
    createOrganization: mResolverCreateOrganization,
    updateOrganization: mResolverUpdateOrganization,
    syncUsers: mResolverSyncUsers,
  },
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = {
  typeDefs,
  resolvers,
  logger: logHttp,
};
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;

import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { readFileSync } from "fs";
import { Resolvers } from "./gql-codegen/graphql.js";
import { mResolverCreateUser, qResolverCurrentUser, qResolverRoles } from "./resolvers.js";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { verifyIdentity } from "./fetch-requests.js";
import httpErrors, { HttpError } from "http-errors";
import { GraphQLError } from "graphql";
import { Organizations, Roles, Users } from "@prisma/client";
import prisma from "./prisma.js";

export interface ApolloServerContext extends BaseContext {
  readonly user: Users;
  readonly organization: Organizations | null;
  readonly roles: Roles[];
}

export const apolloServerContextFn: ExpressMiddlewareOptions<ApolloServerContext>['context'] = async ({ req }) => {
  try {
    // Append all headers from the request to the headers object
    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value === undefined) continue;
      headers.append(key, Array.isArray(value) ? value.join(',') : value);
    }
  
    const verificationResponse = await verifyIdentity({ headers });
    if (!verificationResponse.ok) {
      const errorBody = await verificationResponse.json() as Error;
      throw httpErrors(verificationResponse.status, errorBody.message);
    }

    const responseBody = await verificationResponse.json() as { id: number };
    const user = await prisma.users.findUnique({
      where: { id: responseBody.id },
      include: { organization: true, UserRoles: { include: { role: true } } },
    });
    if (!user) {
      throw new GraphQLError("User not found", { extensions: { code: "NOT_FOUND" } });
    }

    const { UserRoles, organization, ...rest } = user;
    return { user: rest, organization, roles: UserRoles.map(userRole => userRole.role) };
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
    roles: qResolverRoles,
  },
  Mutation: {
    createUser: mResolverCreateUser
  }
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = { typeDefs, resolvers };
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;

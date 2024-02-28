import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { readFileSync } from "fs";
import { Resolvers } from "./gql-codegen/graphql.js";
import { currentUserResolver } from "./resolvers.js";
import { ExpressMiddlewareOptions } from "@apollo/server/express4";
import { verifyIdentity } from "./fetch-requests.js";
import httpErrors, { HttpError } from "http-errors";
import { GraphQLError } from "graphql";

export interface AccessTokenPayload {
  readonly id: number;
  readonly roles: Array<{ readonly id: number }>;
}

export interface ApolloServerContext extends BaseContext {
  readonly userId: AccessTokenPayload['id'];
  readonly roleIds: AccessTokenPayload['roles'][number]['id'][];
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

    const responseBody = await verificationResponse.json() as AccessTokenPayload;
    return {
      userId: responseBody.id,
      roleIds: responseBody.roles.map(role => role.id),
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
    currentUser: currentUserResolver,
  },
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = { typeDefs, resolvers };
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;

import { ApolloServer, ApolloServerOptions, BaseContext } from "@apollo/server";
import { readFileSync } from "fs";
import { Resolvers } from "./gql-codegen/graphql.js";
import { currentUserResolver } from "./resolvers.js";

export interface ApolloServerContext extends BaseContext {
  readonly email: string;
}

const typeDefs = readFileSync('graphql/schema.graphql', { encoding: 'utf-8' });
const resolvers: Resolvers<ApolloServerContext> = {
  Query: {
    currentUser: currentUserResolver,
  },
}

const apolloServerOptions: ApolloServerOptions<ApolloServerContext> = { typeDefs, resolvers };
const apolloServer = new ApolloServer(apolloServerOptions);

export default apolloServer;

import { ApolloServer } from "@apollo/server";
import { readFileSync } from "fs";

const typeDefs = readFileSync('graphql/schema.graphql', { encoding: 'utf-8' });
const resolvers = {};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
export default apolloServer;

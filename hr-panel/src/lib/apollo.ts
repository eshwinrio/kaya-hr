import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env['REACT_APP_RESOURCE_API_DOMAIN']! + process.env['REACT_APP_RESOURCE_API_GRAPHQL_ENDPOINT'],
  cache: new InMemoryCache()
});

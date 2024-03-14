import { ApolloClient, InMemoryCache } from "@apollo/client";

// Get the current hostname of the page
const currentDomain = window.location.origin;

// Get the API domain from the environment variable or default to the current domain
const apiDomain = process.env.REACT_APP_RESOURCE_API_DOMAIN || currentDomain;

// Construct the URI for the GraphQL endpoint
const uri = `${apiDomain}${process.env.REACT_APP_RESOURCE_API_PREFIX}${process.env.REACT_APP_RESOURCE_API_GRAPHQL_ENDPOINT}`;

export const apolloClient = new ApolloClient({
  uri,
  headers: {
    'X-Application': process.env['REACT_APP_APPLICATION_SECRET']!,
  },
  credentials: 'include',
  cache: new InMemoryCache()
});

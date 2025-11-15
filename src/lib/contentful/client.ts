import { env } from "@/env";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

/**
 * Apollo Client for Contentful GraphQL API
 * Used for type-safe queries with proper caching
 */
export const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}`,
    headers: {
      Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
  },
});

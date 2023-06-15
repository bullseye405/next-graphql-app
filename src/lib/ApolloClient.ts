import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import { onError } from "@apollo/client/link/error";

const URI = process.env.GRAPHQL_ENDPOINT;

const headers = {
  "content-type": "application/json",
  "x-hasura-admin-secret": process.env.HASURA_SECRET as string,
};

const httpLink = new HttpLink({
  uri: URI,
  headers,
});

const errorLink = onError((errors) => {
  const { graphQLErrors, networkError } = errors;
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
export const { getClient } = registerApolloClient(() => {
  console.log({ URI, headers });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: from([errorLink, httpLink]),
  });
});

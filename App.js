import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./theme.json";

import AppNavigator from "@containers/AppNavigator";
import SignInScreen from "@screens/SignInScreen";

import useAppUserStore from "@stores/appUserStore";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";


const httpLink = new HttpLink({
  // uri: "http://localhost:4000/graphql",
  uri: "http://192.168.1.43:4000/graphql",
});

const wsLink = new GraphQLWsLink(
  createClient({
    // url: "ws://localhost:4000/graphql",
    url: "ws://192.168.1.43:4000/graphql",
    options: {
      lazy: true,
    }
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      nextFetchPolicy: 'no-cache',
    },
  },
});

export default function App() {
  const { appUser, signInAppUser } = useAppUserStore();
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={{ ...theme, ...eva.light }}>
        {
          appUser ? (
            <AppNavigator />
          ) : (
            <SignInScreen />
          )
        }
      </ApplicationProvider>
    </ApolloProvider>
  );
}

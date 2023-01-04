import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./theme.json";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { Root } from "react-native-popup-confirm-toast";

import { ApplicationNavigator, AuthencationNavigator } from "@navigation";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";

import { GRAPHQL_URI } from "@env";


const httpLink = new HttpLink({
  uri: `http://${GRAPHQL_URI}`,
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: `ws://${GRAPHQL_URI}`,
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
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    },
    query: {
      fetchPolicy: 'no-cache',
      nextFetchPolicy: 'no-cache',
    },
  },
});

const style = StyleSheet.create({
  rootLayout: {
    width: "100%",
    height: Dimensions.get("window").height,
  }
});


const { Navigator, Screen } = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={{ ...theme, ...eva.light }}>
        <Root>
          <ScrollView>
            <View style={style.rootLayout}>
              <NavigationContainer>
                <Navigator>
                  <Screen
                    name="AuthencationNavigator"
                    component={AuthencationNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Screen
                    name="ApplicationNavigator"
                    component={ApplicationNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                </Navigator>
              </NavigationContainer>
            </View>
          </ScrollView>
        </Root>
      </ApplicationProvider>
    </ApolloProvider>
  );
}

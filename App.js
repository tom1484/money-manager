import React from "react";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import { default as theme } from "./theme.json";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { Root } from "react-native-popup-confirm-toast";

import AppNavigator from "@containers/AppNavigator";
import SignInNavigator from "@containers/SignInNavigator";

import useAppUserStore from "@stores/appUserStore";

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ScrollView, StyleSheet, Dimensions, View } from "react-native";


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

const style = StyleSheet.create({
  rootLayout: {
    width: "100%",
    height: Dimensions.get("window").height,
  }
});


const { Navigator, Screen } = createStackNavigator();

export default function App() {
  const { appUser } = useAppUserStore();
  return (
    <ApolloProvider client={client}>
      <ApplicationProvider {...eva} theme={{ ...theme, ...eva.light }}>
        <Root>
          <ScrollView>
            <View style={style.rootLayout}>
              <NavigationContainer>
                <Navigator>
                  <Screen
                    name="SignInNavigator"
                    component={SignInNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                  <Screen
                    name="AppNavigator"
                    component={AppNavigator}
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

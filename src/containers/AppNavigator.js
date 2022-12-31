import React from "react";

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
} from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Dimensions, View, ScrollView } from "react-native";

import HomeScreen from "@screens/HomeScreen";
import StatisticsScreen from "@screens/StatisticsScreen";
import AccountsScreen from "@screens/AccountsScreen";
import SettingsScreen from "@screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        icon={<Foundation name="home" size={24} color="black" />}
      />
      <BottomNavigationTab
        icon={<Ionicons name="stats-chart-sharp" size={24} color="black" />}
      />
      <BottomNavigationTab
        icon={<MaterialIcons name="account-balance" size={24} color="black" />}
      />
      <BottomNavigationTab
        icon={<Ionicons name="settings" size={24} color="black" />}
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Home" component={HomeScreen} />
    {/* <Screen name="Home" component={SignInScreen} /> */}
    <Screen name="Statistics" component={StatisticsScreen} />
    <Screen name="Accounts" component={AccountsScreen} />
    <Screen name="Settings" component={SettingsScreen} />
  </Navigator>
);

const AppNavigator = () => (
  <TabNavigator />
);

const style = StyleSheet.create({
  rootLayout: {
    width: "100%",
    height: Dimensions.get("window").height,
  }
});

export default AppNavigator;

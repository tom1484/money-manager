import React from "react";

import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

import { TransactionsScreen, StatisticsScreen, AccountsScreen, SettingsScreen } from "@screens/application";
import { AccountsScreenNavigator } from "@navigation/application";

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        icon={<Entypo name="text-document-inverted" size={24} color="black" />}
      />
      <BottomNavigationTab
        icon={<Ionicons name="stats-chart-sharp" size={24} color="black" />}
      />
      <BottomNavigationTab
        icon={<MaterialIcons name="account-balance" size={24} color="black" />}
      />
      {/* <BottomNavigationTab
        icon={<Ionicons name="settings" size={24} color="black" />}
      /> */}
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator
    tabBar={(props) => <BottomTabBar {...props} />}
    screenOptions={{
      headerShown: false,
      // headerStyle: {
      //   borderBottomWidth: 1,
      // }
    }}
  >
    <Screen name="Transactions" component={TransactionsScreen} />
    <Screen name="Statistics" component={StatisticsScreen} />
    {/* <Screen name="Accounts" component={AccountsScreen} /> */}
    <Screen name="AccountsScreen" component={AccountsScreenNavigator} />
    {/* <Screen name="Settings" component={SettingsScreen} /> */}
  </Navigator>
);

const AppNavigator = ({ navigation }) => {

  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
    });
  }, [navigation]);

  return (
    <TabNavigator />
  )
};

export default AppNavigator;

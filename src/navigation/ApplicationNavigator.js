import React from "react";

import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Foundation, Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";

import { LedgerScreen, StatisticsScreen, AccountsScreen, SettingsScreen } from "@screens/application";

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
      <BottomNavigationTab
        icon={<Ionicons name="settings" size={24} color="black" />}
      />
    </BottomNavigation>
  );
};

const TabNavigator = () => (
  <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
    <Screen name="Ledger" component={LedgerScreen} />
    <Screen name="Statistics" component={StatisticsScreen} />
    <Screen name="Accounts" component={AccountsScreen} />
    <Screen name="Settings" component={SettingsScreen} />
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

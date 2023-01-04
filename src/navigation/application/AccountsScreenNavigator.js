import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { AccountsScreen, AccountDetailScreen, AddAccountScreen, DeleteAccountScreen } from "@screens/application/account";
import { Button, Layout, Text, MenuItem, OverflowMenu } from "@ui-kitten/components";
import { Feather } from '@expo/vector-icons';
import { TouchableNativeFeedback, View } from "react-native";

const { Navigator, Screen } = createStackNavigator();

const AccountsScreenNavigator = () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderBottomWidth: 1,
        },
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Screen
        name="Accounts"
        component={AccountsScreen}
        options={{
          title: 'Accounts',
          headerLeft: () => null,
        }}
      />
      <Screen
        name="AccountDetail"
        component={AccountDetailScreen}
        options={{
          title: 'Detail',
        }}
      />
      <Screen
        name="AddAccount"
        component={AddAccountScreen}
        options={{
          title: 'Add Account',
        }}
      />
      <Screen
        name="DeleteAccount"
        component={DeleteAccountScreen}
        options={{
          title: 'Delete Account',
        }}
      />
    </Navigator>
  )
};

export default AccountsScreenNavigator;
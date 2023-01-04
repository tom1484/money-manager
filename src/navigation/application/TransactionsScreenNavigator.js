import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { TransactionsScreen, TransactionInfoScreen } from "@screens/application/transaction";

const { Navigator, Screen } = createStackNavigator();

const TransactionsScreenNavigator = () => {
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
        name="Transactions"
        component={TransactionsScreen}
        options={{
          title: 'Transactions',
          headerLeft: () => null,
        }}
      />
      <Screen
        name="TransactionInfo"
        component={TransactionInfoScreen}
        options={{
          title: 'Transaction',
        }}
      />
      {/* <Screen
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
      /> */}
    </Navigator>
  )
};

export default TransactionsScreenNavigator;
import React from "react";

import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { SignInScreen, SignUpScreen } from "@screens/authencation";

import useAppUserStore from "@stores/appUserStore";

const { Navigator, Screen } = createStackNavigator();

const SignInNavigator = ({ navigation }) => {
  const { appUser } = useAppUserStore();

  React.useEffect(() => {
    if (appUser) {
      navigation.navigate("ApplicationNavigator");
    }
  }, [appUser]);

  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Screen
        name="SignIn"
        component={SignInScreen}
        options={{
          title: 'SIGN IN',
        }}
      />
      <Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          title: 'SIGN UP',
        }}
      />
    </Navigator>
  )
};

export default SignInNavigator;
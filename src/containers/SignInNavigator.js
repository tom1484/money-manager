import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import SignInScreen from "@screens/SignInScreen";
import SignUpScreen from "@screens/SignUpScreen";

const { Navigator, Screen } = createStackNavigator();

const SignInNavigator = () => (
  // <NavigationContainer>
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
  // </NavigationContainer>
);

export default SignInNavigator;
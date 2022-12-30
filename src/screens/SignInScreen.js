import React from "react";

import { ScrollView, Dimensions, View } from "react-native";
import { Button, Card, Input, Layout, Text, Spinner } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";

import useConsecutiveInputRefs from "@refs/consecutiveInputRefs";
import useAppUserManager from "@hooks/useAppUserManager";

const ThemedComponent = ({ eva }) => {
  const { inputRefs, nextInputFuncs, submitRef } = useConsecutiveInputRefs(2);

  const { signInProcessing, signInAppUser } = useAppUserManager();
  const [userNameInput, setUserNameInput] = React.useState("");
  const [passwordInput, setPasswordInput] = React.useState("");

  const handleSignIn = () => {
    signInAppUser(userNameInput, passwordInput);
  }

  const LoadingIndicator = (props) => (
    <View style={[props.style, eva.style.indicator]}>
      <Spinner size='small' status="basic" />
    </View>
  );

  return (
    <ScrollView>
      <Layout style={eva.style.rootLayout}>
        {/* <Layout style={eva.style.titleLayout}>
          <Text category="h1">Money</Text>
          <Text category="h1">Manager</Text>
        </Layout> */}
        <Layout style={eva.style.formLayout} level="2">
          <Text category="h1" style={{ margin: 10 }}>Welcome</Text>
          <Input
            style={eva.style.input}
            label="Username"
            value={userNameInput}
            onChangeText={setUserNameInput}
            ref={inputRefs[0]}
            blurOnSubmit={false}
            onSubmitEditing={nextInputFuncs[0]}
          />
          <Input
            style={eva.style.input}
            label='Password'
            value={passwordInput}
            onChangeText={setPasswordInput}
            ref={inputRefs[1]}
            blurOnSubmit={false}
            onSubmitEditing={nextInputFuncs[1]}
          />
          <Button
            style={eva.style.button}
            ref={submitRef}
            onPress={handleSignIn}
            accessoryLeft={signInProcessing ? LoadingIndicator : null}
          >
            SIGN IN
          </Button>
        </Layout>
        <Layout style={eva.style.footerLayout}>
          <Text appearance="hint">
            Don't have an account? <Text appearance="hint" status="primary" category="p2">Sign Up</Text>
          </Text>
        </Layout>
      </Layout>
    </ScrollView>
  );
};

const ThemedSignInScreen = withStyles(ThemedComponent, theme => {
  return ({
    rootLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: Dimensions.get("window").height,
    },
    titleLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      maxHeight: "20%",
    },
    formLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      maxHeight: "50%",
      // height: 500,
      borderRadius: 20,
      borderColor: theme["color-border-100"],
      borderWidth: 1,
    },
    input: {
      // marginLeft: 20,
      // marginRight: 20,
      width: "80%",
      marginTop: 10,
      marginBottom: 10,
    },
    button: {
      marginLeft: 20,
      marginRight: 20,
      marginTop: 15,
      marginBottom: 15,
      width: "80%",
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    footerLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "80%",
      maxHeight: "5%",
    }
  })
});

export default ThemedSignInScreen;

import React from "react";

import { ScrollView, Dimensions, View } from "react-native";
import { Button, Card, Input, Layout, Text, Spinner } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";

import { Popup } from 'react-native-popup-confirm-toast';

import useConsecutiveInput from "@hooks/useConsecutiveInput";
import useAppUserManager from "@hooks/useAppUserManager";

const ThemedComponent = ({ eva, navigation }) => {
  const { inputRefs, inputStatus, nextInputFuncs, submitRef, onSubmit } = useConsecutiveInput(
    2, () => {
      signInAppUser(userNameInput, passwordInput);
    }
  );

  const { signInProcessing, signInAppUser, status } = useAppUserManager();
  const [userNameInput, setUserNameInput] = React.useState("tom1484");
  const [passwordInput, setPasswordInput] = React.useState("password");

  const showStatus = (status) => {
    const { flag, title, message } = status;
    switch (flag) {
      case "success":
        Popup.show({
          type: 'success',
          title: title,
          textBody: message,
          buttonEnabled: false,
          duration: 0,
          closeDuration: 50,
          bounciness: 5,
          timing: 1500,
        })
        break;
      case "error":
        Popup.show({
          type: 'danger',
          title: title,
          textBody: message,
          buttonEnabled: false,
          duration: 0,
          closeDuration: 50,
          bounciness: 5,
          timing: 1500,
        })
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    showStatus(status);
  }, [status]);

  const LoadingIndicator = (props) => (
    <View style={[props.style, eva.style.indicator]}>
      <Spinner size='small' status="basic" />
    </View>
  );

  return (
    <Layout style={eva.style.rootLayout}>
      <Layout style={eva.style.formLayout} level="2">
        <Text category="h1" style={{ margin: 10 }}>Welcome</Text>
        <Input
          style={eva.style.input}
          label="Username"
          value={userNameInput}
          onChangeText={setUserNameInput}
          blurOnSubmit={false}
          ref={inputRefs[0]}
          onSubmitEditing={nextInputFuncs[0]}
          status={inputStatus[0]}
        />
        <Input
          style={eva.style.input}
          label='Password'
          value={passwordInput}
          onChangeText={setPasswordInput}
          blurOnSubmit={false}
          secureTextEntry={true}
          ref={inputRefs[1]}
          onSubmitEditing={nextInputFuncs[1]}
          status={inputStatus[1]}
        />
        <Button
          style={eva.style.button}
          ref={submitRef}
          onPress={onSubmit}
          accessoryLeft={signInProcessing ? LoadingIndicator : null}
          disabled={signInProcessing}
        >
          SIGN IN
        </Button>
      </Layout>
      <Layout style={eva.style.footerLayout}>
        <Text appearance="hint">
          Don't have an account?&nbsp;
          <Text
            appearance="hint"
            status="primary"
            category="p2"
            onPress={() => { navigation.navigate("SignUp") }}
          >
            Sign Up
          </Text>
        </Text>
      </Layout>
    </Layout>
  );
};

const SignInScreen = withStyles(ThemedComponent, theme => {
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
      // height: "fit-content",
      borderRadius: 20,
      borderColor: theme["color-border-100"],
      borderWidth: 1,
    },
    input: {
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

export default SignInScreen;

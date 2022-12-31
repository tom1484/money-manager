import React from "react";

import { View } from "react-native";
import { Button, Input, Layout, Text, Spinner } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";

import { Popup } from 'react-native-popup-confirm-toast';

import useConsecutiveInput from "@hooks/useConsecutiveInput";
import useAppUserManager from "@hooks/useAppUserManager";

const ThemedComponent = ({ eva }) => {
  const { inputRefs, inputStatus, nextInputFuncs, submitRef, onSubmit } = useConsecutiveInput(
    3, () => {
      signUpAppUser(userNameInput, passwordInput, emailInput);
    }
  );

  const { signUpProcessing, signUpAppUser, status } = useAppUserManager();
  const [userNameInput, setUserNameInput] = React.useState("tom1484");
  const [passwordInput, setPasswordInput] = React.useState("password");
  const [emailInput, setEmailInput] = React.useState("tomchen2003611@gmail.com");

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
        <Text category="h1" style={{ margin: 10 }}>Accuont</Text>
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
          ref={inputRefs[1]}
          blurOnSubmit={false}
          secureTextEntry={true}
          onSubmitEditing={nextInputFuncs[1]}
          status={inputStatus[1]}
        />
        <Input
          style={eva.style.input}
          label='E-mail'
          value={emailInput}
          onChangeText={setEmailInput}
          blurOnSubmit={false}
          ref={inputRefs[2]}
          onSubmitEditing={nextInputFuncs[2]}
          status={inputStatus[2]}
        />
        <Button
          style={eva.style.button}
          ref={submitRef}
          onPress={onSubmit}
          accessoryLeft={signUpProcessing ? LoadingIndicator : null}
          disabled={signUpProcessing}
        >
          SIGN UP
        </Button>
      </Layout>
    </Layout>
  );
};

const SignUpScreen = withStyles(ThemedComponent, theme => {
  return ({
    rootLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
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
      maxHeight: "62%",
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

export default SignUpScreen;

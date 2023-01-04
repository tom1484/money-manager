import React from "react";

import { Dimensions, View } from "react-native";
import { Button, Input, Layout, Text, Spinner } from "@ui-kitten/components";
import { withStyles } from "@ui-kitten/components";

import { Popup } from 'react-native-popup-confirm-toast';

import { LoadingButton } from "@components/common";

import useConsecutiveInput from "@hooks/useConsecutiveInput";
import useAuthencation from "@hooks/useAuthencation";

import useAccountTableStore from "@stores/accountTableStore";

const ThemedComponent = ({ eva, route, navigation }) => {
  const { accountNameTable } = useAccountTableStore();

  const { transaction } = route.params;
  console.log(transaction)

  // const showStatus = (status) => {
  //   const { flag, title, message } = status;
  //   switch (flag) {
  //     case "success":
  //       Popup.show({
  //         type: 'success',
  //         title: title,
  //         textBody: message,
  //         buttonEnabled: false,
  //         duration: 0,
  //         closeDuration: 50,
  //         bounciness: 3,
  //         timing: 1500,
  //       })
  //       break;
  //     case "error":
  //       Popup.show({
  //         type: 'danger',
  //         title: title,
  //         textBody: message,
  //         buttonEnabled: false,
  //         duration: 0,
  //         closeDuration: 50,
  //         bounciness: 3,
  //         timing: 1500,
  //       })
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // React.useEffect(() => {
  //   showStatus(status);
  // }, [status]);

  return (
    <Layout style={eva.style.rootLayout}>
      {/* <Layout style={eva.style.formLayout} level="2"> */}
      <Text category="h1" style={{ margin: 10 }}>Welcome</Text>

    </Layout >
  );
};

const TransactionInfoScreen = withStyles(ThemedComponent, theme => ({
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
}));

export default TransactionInfoScreen;

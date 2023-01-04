import React from "react";

import { Layout, Text, withStyles } from "@ui-kitten/components";

import { LoadingLayout } from "@components/common";

const ThemedComponent = ({ eva }) => {
  return (
    <LoadingLayout
      style={eva.style.rootLayout}
      loading={false}
      indicatorStyle={eva.style.indicator}
    >
      <Text>Settings!</Text>
    </LoadingLayout>
  );
}

const SettingsScreen = withStyles(ThemedComponent, theme => {
  return {
    rootLayout: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    },
    indicator: {
      justifyContent: 'center',
      alignItems: 'center',
      spinnerSize: 'giant',
    },
  };
});

export default SettingsScreen;

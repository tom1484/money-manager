import React from "react";

import { Layout, Button, Text, Card, withStyles } from "@ui-kitten/components"
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { TouchableNativeFeedback } from "react-native";

import useAccountTableStore from "@stores/accountTableStore";

const transactionTypeTitle = {
  "INCOME": "Income",
  "EXPENSE": "Expense",
  "TRANSFER": "Transfer",
};

const ThemedComponent = ({ eva, transaction, accountID, onPress }) => {
  const { accountNameTable } = useAccountTableStore();

  return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#EEEEEE", false)}>
      <Layout style={eva.style.rootLayout} onTouchEnd={() => onPress(transaction)}>
        <Layout style={eva.style.typeLayout}>
          <Text appearance="hint" style={eva.style.typeText}>
            {transactionTypeTitle[transaction.type]}
          </Text>
        </Layout>
        <Layout style={eva.style.accountsLayout}>
          {
            (() => {
              switch (transaction.type) {
                case "TRANSFER":
                  return (
                    <React.Fragment>
                      <Text style={eva.style.accountText}>
                        {accountNameTable[transaction.accountSource]}
                      </Text>
                      <AntDesign name="arrowright" size={18} color="black" />
                      <Text style={eva.style.accountText}>
                        {accountNameTable[transaction.accountDestination]}
                      </Text>
                    </React.Fragment>
                  );
                case "INCOME":
                  return (
                    <React.Fragment>
                      <Text style={eva.style.accountText}>
                        {accountNameTable[transaction.accountDestination]}
                      </Text>
                    </React.Fragment>
                  );
                case "EXPENSE":
                  <React.Fragment>
                    <Text style={eva.style.accountText}>
                      {accountNameTable[transaction.accountSource]}
                    </Text>
                  </React.Fragment>
              }
            })()
          }
        </Layout >
        <Layout style={eva.style.amountLayout}>
          <Text
            style={eva.style.amountText}
            status={transaction.accountDestination === accountID ? "info" : "danger"}
          >
            {transaction.amount.toFixed(1)}
          </Text>
        </Layout>
      </Layout>
    </TouchableNativeFeedback >
  );
};

const TransactionInfo = withStyles(ThemedComponent, (theme) => ({
  rootLayout: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopWidth: 1,
    borderColor: theme["color-border-100"],
    backgroundColor: theme["color-basic-100"],
  },
  typeLayout: {
    width: "20%",
    backgroundColor: "#00000000"
  },
  typeText: {
    fontSize: 12,
  },
  accountsLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "55%",
    backgroundColor: "#00000000"
  },
  accountText: {
    fontSize: 12,
    marginHorizontal: 5,
  },
  amountLayout: {
    alignItems: "center",
    width: "25%",
    backgroundColor: "#00000000"
  },
  amountText: {
    fontSize: 12,
  },
}));

export default TransactionInfo;
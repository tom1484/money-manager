import React from "react";

import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { USER_ACCOUNT_QUERY } from "@graphql/queries";


const useAppUserManager = () => {
  const [qlGetAccount] = useLazyQuery(USER_ACCOUNT_QUERY);

  const [signInProcessing, setSignInProcessing] = React.useState(false);

  const signInAppUser = (userName, password) => {
    qlGetAccount({ variables: { ID: userName } })
      .then((result) => {
        console.log(result.data);
      });
    setSignInProcessing(true);
  }

  return {
    signInProcessing, signInAppUser
  }
};

export default useAppUserManager;
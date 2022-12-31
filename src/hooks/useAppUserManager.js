import React from "react";

import { useLazyQuery, useMutation, useSubscription } from '@apollo/client';
import { USER_SIGN_IN_QUERY } from "@graphql/queries";
import { USER_SIGN_UP_MUTATION } from "@graphql/mutations";

import useAppUserStore from "@stores/appUserStore";


const useAppUserManager = () => {
  const [qlUserSignIn] = useLazyQuery(USER_SIGN_IN_QUERY);
  const [qlUserSignUp] = useMutation(USER_SIGN_UP_MUTATION);

  const [signInProcessing, setSignInProcessing] = React.useState(false);
  const [signUpProcessing, setSignUpProcessing] = React.useState(false);
  const [status, setStatus] = React.useState({});

  const { setAppUser } = useAppUserStore();

  const signInAppUser = (userName, password) => {
    setSignInProcessing(true);
    qlUserSignIn({ variables: { name: userName, password: password } })
      .then((result) => {
        setSignInProcessing(false);

        if (result.data && result.data["userSignIn"]) {
          const { status, token, appUser } = result.data["userSignIn"];

          switch (status) {
            case "0":
              setStatus({
                flag: "error",
                title: "Login Failed",
                message: "Invalid Username or Password"
              });
              break;

            case "1":
              setStatus({
                flag: "success",
                title: 'Successfully Signed In',
                message: "Welcome to Money Manager!"
              });
              setAppUser({
                name: appUser.name
              }, token);
              break;

            case "-1":
              setStatus({
                flag: "error",
                title: 'Unknown Error',
                message: "Please try again later"
              });
              break;

            default:
              break;
          }
        } else {
          setStatus({
            flag: "error",
            title: 'Unknown Error',
            message: "Please try again later"
          });
        }
      })
      .catch((error) => {
        setSignInProcessing(false);
        setStatus({
          flag: "error",
          title: 'Unknown Error',
          message: "Please try again later"
        });
      });
  };

  const signUpAppUser = (userName, password, email) => {
    setSignUpProcessing(true);

    qlUserSignUp({ variables: { name: userName, password: password, email: email } })
      .then((result) => {
        setSignUpProcessing(false);

        if (result.data && result.data["userSignUp"]) {
          const { status, token, appUser } = result.data["userSignUp"];

          switch (status) {
            case "0-0":
              setStatus({
                flag: "error",
                title: "User Exists",
                message: "Use a different username"
              });
              break;

            case "0-1":
              setStatus({
                flag: "error",
                title: "E-mail Used",
                message: "Use a different e-mail"
              });
              break;

            case "1":
              setStatus({
                flag: "success",
                title: 'Successfully Signed Up',
                message: "Welcome to Money Manager!"
              });
              setAppUser({
                name: appUser.name
              }, token);
              break;

            case "-1":
              setStatus({
                flag: "error",
                title: 'Unknown Error',
                message: "Please try again later"
              });
              break;

            default:
              break;
          }
        } else {
          setStatus({
            flag: "error",
            title: 'Unknown Error',
            message: "Please try again later"
          });
        }
      })
      .catch((error) => {
        setSignUpProcessing(false);
        setStatus({
          flag: "error",
          title: 'Unknown Error',
          message: "Please try again later"
        });
      });
  };

  return {
    signInProcessing, signInAppUser,
    signUpProcessing, signUpAppUser,
    status
  };
};

export default useAppUserManager;
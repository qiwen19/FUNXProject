import React from "react";
import { StyleSheet, Image, View, Header } from "react-native";

import LoginPageTab from "./login";
import RegisterPageTab from "./register";
// import ForgetPassword from './ForgetPassword'

import { createMaterialTopTabNavigator } from "react-navigation-tabs";

export const LoginRegister = createMaterialTopTabNavigator(
  {
    LoginPageTab: {
      screen: LoginPageTab,
      navigationOptions: { tabBarLabel: "SIGN IN" }
    },
    RegisterPageTab: {
      screen: RegisterPageTab,
      navigationOptions: { tabBarLabel: "SIGN UP" }
    }
  },
  {
    navigationOptions: {
      headerStyle: { height: 156 },
      headerBackground: (
        <Image
          source={require("../../../assets/bus.gif")}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }}
        />
      )
    }
  }
);

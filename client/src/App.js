import React from "react";
import { AppLoading, AR } from "expo";
import { Asset } from "expo-asset";
import * as ThreeAR from "expo-three-ar";
// import ExpoTHREE, {THREE}from 'expo-three';
// import { View as GraphicsView } from 'expo-graphics';
import { Container, Text, Footer, FooterTab, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Header from '../src/components/layout/header';
import LoginPageTab from "../src/components/auth/login";
import RegisterPageTab from "../src/components/auth/register";
import { LoginRegister } from "./components/auth/loginRegister";
import Forget from "../src/components/auth/forgetPassword";
import Reward from "../src/components/rewards/reward";
import Profile from "../src/components/profile/profile";
import Navigation from "./components/navigation/Navigation";
import Feedback from "../src/components/navigation/feedback";
import ARChallenge from "../src/components/challenge/AR";
import ChallengePage from "../src/components/challenge/challengePage";
import TimePage from "./components/challenge/TimePage";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { NavProvider } from "./components/navigation/navContent";

import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const AuthStack = createStackNavigator(
  {
    LoginRegister: {
      screen: LoginRegister
    },
    Forget: Forget
  },
  {
    initialRouteName: "LoginRegister"
    // headerMode: "none"
  }
);

const mainTab = createBottomTabNavigator({
  NavigationScreen: {
    screen: Navigation,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Icon name="compass" color={tintColor}></Icon>
      ),
      tabBarLabel: "Navigation"
    }
  },
  ProfileScreen: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="user-circle" size={22} color={tintColor} />
      ),
      tabBarLabel: "Profile"
    }
  },
  RewardScreen: {
    screen: Reward,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="money" size={22} color={tintColor} />
      ),
      tabBarLabel: "Rewards"
    }
  }
});

const feedbackNav = createStackNavigator(
  {
    Feedback: Feedback
  },
  {
    headerMode: "none"
  }
);

const Challenge = createStackNavigator(
  {
    ChallengeScreen: {
      screen: ChallengePage
    },
    ARScreen: {
      screen: ARChallenge
    },
    TimeScreen: {
      screen: TimePage
    }
  },
  {
    headerMode: "none"
  }
);

const Appz = createSwitchNavigator(
  {
    Auth: {
      screen: AuthStack
    },
    App: {
      screen: mainTab
    },
    FeedbackS: {
      screen: feedbackNav
    },
    ChallengeS: {
      screen: Challenge
    }
  }
  // {
  //   initialRouteName: "Auth"
  // }
);

// const Tabs = createBottomTabNavigator({ AppNavigator});
const AppContainer = createAppContainer(Appz);

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("../node_modules/native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("../node_modules/native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <NavProvider>
        <AppContainer></AppContainer>
      </NavProvider>
    );
  }
}

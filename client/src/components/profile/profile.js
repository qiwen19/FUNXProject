import React from "react";
import { StyleSheet, Image, Platform, StatusBar } from "react-native";
import { Container, Text, Form, Item, Input, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import HeaderLayout from "../layout/header";
import ProfileCard from "../profile/profileCard";
import Firebase from "../../../config/Firebase";

const styles = StyleSheet.create({
  conStyle: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },
  ItemStyle: {
    marginTop: 25
  },
  LogoStyle: {
    backgroundColor: "#1A7F33",
    justifyContent: "center",
    alignItems: "center"
  },
  ImgStyle: {
    width: "50%",
    height: "100%",
    marginTop: 50
  },
  FormStyle: {
    marginHorizontal: 50
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center"
  }
});

export default class Profile extends React.Component {
  state = {
    userData: null
  };
  // _signOutAsync = async () => {
  //   await AsyncStorage.clear();
  //   this.props.navigation.navigate("Auth");
  // };
  async componentDidMount() {
    await this.getUser();
  }

  async getUser() {
    await Firebase.database()
      .ref("/User/" + Firebase.auth().currentUser.uid)
      .once("value", snapshot => {
        userDatas = snapshot.val();
      });
    this.setState({ userData: userDatas });
  }
  render() {
    return (
      <Container style={styles.conStyle}>
        {this.state.userData != null ? (
          <React.Fragment>
            <HeaderLayout setHeader={"Profile"} />
            <ProfileCard
              userName={this.state.userData.Name}
              Email={this.state.userData.Email}
              DOB={this.state.userData.DOB}
              points={this.state.userData.Points}
              Sex={this.state.userData.Sex}
              CM={this.state.userData.CM}
            />
            {/* <Button
              backgroundColor="#03A9F4"
              rounded
              onPress={() => this.props.navigation.navigate("Auth")}
              style={styles.btnStyle}
            >
              <Text>Logout</Text>
            </Button> */}
          </React.Fragment>
        ) : (
          <Text></Text>
        )}
      </Container>
    );
  }
}

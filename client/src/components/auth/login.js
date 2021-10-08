import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  View,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import {
  Container,
  Text,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Content
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import Firebase from "../../../config/Firebase";
import { Platform } from "@unimodules/core";
import SafeAreaView from "react-native-safe-area-view";

const deviceWidth = Dimensions.get("window").width;
const KEYBOARD_VERTICAL_OFFSET = 200 + StatusBar.currentHeight;

const styles = StyleSheet.create({
  container: {
    width: "100%"
  },
  mainContainer: {
    flex: 1,
    paddingBottom: 100
  },
  backgroundImg: {
    width: "100%",
    height: "100%"
    // opacity: .8
  },
  ItemStyle: {
    marginTop: 25,
    borderBottomColor: "black",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  ItemStyle1: {
    // marginTop: 25,
    borderBottomColor: "black",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  ImgStyle: {
    marginTop: "10%",
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  FormStyle: {
    marginHorizontal: 10
  },
  loginBtnView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: 20
  },
  loginBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    width: "80%",
    borderRadius: 2,
    backgroundColor: "rgba(0,79,173,1)",
    marginLeft: "auto",
    marginRight: "auto"
  },
  loginText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  }
});

export default class Login extends React.Component {
  state = {
    email: "",
    password: "",
    hidden: true
  };

  static navigationOptions = {
    header: null
  };
  onIconPress = () => {
    this.setState({ hidden: !this.state.hidden });
  };
  handleLogin = () => {
    // Method called when LOGIN button is pressed
    const { email, password } = this.state;
    var error_count = 0;
    if (email.length == 0 && password.length == 0) {
      // If username and password left blank
      alert(
        "Username and Password are required fields. Enter your username and password.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      error_count += 1;
    } else if (email.length == 0) {
      // If username left blank
      alert(
        "Username is a required field. Enter your username.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      error_count += 1;
    } else if (password.length == 0) {
      // If password left blank
      alert(
        "Password is a required field. Enter your password.",
        [{ text: "OK" }],
        { cancelable: false }
      );
      error_count += 1;
    }

    if (error_count == 0) {
      // If no errors
      Firebase.auth()
        .signInWithEmailAndPassword(email, password) // Sign in to firebase using provided values
        .then(() => {
          this.props.navigation.navigate("App");
        }) // Post success navigate to HomePage
        .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch login errors (Wrong user/password)
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Container style={styles.container}>
        <ImageBackground
          style={styles.backgroundImg}
          source={require("../../../assets/GradientBG.png")}
        >
          <KeyboardAvoidingView
            style={styles.mainContainer}
            behavior={Platform.OS === "ios" ? "padding" : null}
            enabled
            // keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
            // enabled
          >
            <Content>
              <Image
                source={require("../../../assets/logo1.png")}
                resizeMode="contain"
                style={styles.ImgStyle}
              />

              <Form style={styles.FormStyle}>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="contact" style={{ color: "#143d4f" }} />
                  <Input
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    placeholder="Email"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  ></Input>
                </Item>

                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="lock" style={{ color: "#143d4f" }} />
                  <Input
                    type="password"
                    secureTextEntry={this.state.hidden}
                    autoCompleteType="off"
                    placeholder="Password"
                    value={this.state.password}
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    onChangeText={password => this.setState({ password })}
                  ></Input>
                  <TouchableOpacity onPress={this.onIconPress}>
                    <Icon name={this.state.hidden ? "eye-off" : "eye"} />
                  </TouchableOpacity>
                </Item>

                <TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "right",
                      marginTop: "3%",
                      textDecorationLine: "underline",
                      color: "white",
                      width: "90%"
                    }}
                    onPress={() => this.props.navigation.navigate("Forget")}
                  >
                    Forget Password
                  </Text>
                </TouchableOpacity>

                <View style={styles.loginBtnView}>
                  <Button
                    // rounded
                    style={styles.loginBtn}
                    onPress={this.handleLogin}
                  >
                    <Text style={styles.loginText}>Sign in</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Container>
    );
  }
  _signInAsync = async () => {
    // await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate("App");
  };
}

// import React from "react";
// import {
//   StyleSheet,
//   Image,
//   ImageBackground,
//   KeyboardAvoidingView
// } from "react-native";
// import { Container, Text, Form, Item, Input, Button, Icon } from "native-base";
// import { Col, Row, Grid } from "react-native-easy-grid";
// import Firebase from "../../../config/Firebase";
// const styles = StyleSheet.create({
//   backgroundImg: {
//     width: "100%",
//     height: "100%"
//   },
//   ItemStyle: {
//     marginTop: 25,
//     backgroundColor: "rgba(253,251,251,0.25)",
//     borderRadius: 5,
//     borderColor: "rgba(253,251,251,0.25)"
//   },
//   LogoStyle: {
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   ImgStyle: {
//     width: "50%",
//     height: "100%"
//   },
//   FormStyle: {
//     marginHorizontal: 50
//   },
//   btnStyle: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 50,
//     marginHorizontal: 50,
//     marginBottom: 20,
//     backgroundColor: "rgba(0,79,173,1)"
//   }
// });

// export default class Login extends React.Component {
//   state = {
//     email: "",
//     password: ""
//   };
//   static navigationOptions = {
//     header: null
//   };
//   handleLogin = () => {
//     // Method called when LOGIN button is pressed
//     const { email, password } = this.state;
//     var error_count = 0;
//     if (email.length == 0 && password.length == 0) {
//       // If username and password left blank
//       alert(
//         "Username and Password are required fields. Enter your username and password.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//       error_count += 1;
//     } else if (email.length == 0) {
//       // If username left blank
//       alert(
//         "Username is a required field. Enter your username.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//       error_count += 1;
//     } else if (password.length == 0) {
//       // If password left blank
//       alert(
//         "Password is a required field. Enter your password.",
//         [{ text: "OK" }],
//         { cancelable: false }
//       );
//       error_count += 1;
//     }

//     if (error_count == 0) {
//       // If no errors
//       Firebase.auth()
//         .signInWithEmailAndPassword(email, password) // Sign in to firebase using provided values
//         .then(() => {
//           this.props.navigation.navigate("App");
//         }) // Post success navigate to HomePage
//         .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch login errors (Wrong user/password)
//     }
//   };

//   render() {
//     return (
//       <Container>
//         <ImageBackground
//           style={styles.backgroundImg}
//           source={require("../../../assets/GradientBG.png")}
//         >
//           <Row size={40} style={styles.LogoStyle}>
//             <Image
//               source={require("../../../assets/logo1.png")}
//               resizeMode="contain"
//               style={styles.ImgStyle}
//             />
//           </Row>

//           <Row size={60}>
//             <Col>
//               <Form style={styles.FormStyle}>
//                 <Item regular style={styles.ItemStyle}>
//                   <Icon name="contact"></Icon>
//                   <Input
//                     placeholderTextColor="rgba(0,42,90,1)"
//                     placeholder="Email"
//                     value={this.state.email}
//                     onChangeText={email => this.setState({ email })}
//                   ></Input>
//                 </Item>

//                 <Item regular style={styles.ItemStyle}>
//                   <Icon name="lock"></Icon>
//                   <Input
//                     type="password"
//                     secureTextEntry={true}
//                     autoCompleteType="off"
//                     placeholder="Password"
//                     value={this.state.password}
//                     placeholderTextColor="rgba(0,42,90,1)"
//                     onChangeText={password => this.setState({ password })}
//                   ></Input>
//                 </Item>

//                 <Button
//                   rounded
//                   style={styles.btnStyle}
//                   onPress={this.handleLogin}
//                 >
//                   <Text>Sign in</Text>
//                 </Button>
//               </Form>

//               <Text
//                 style={{
//                   textAlign: "center",
//                   textDecorationLine: "underline",
//                   color: "white"
//                 }}
//                 onPress={() => this.props.navigation.navigate("App")}
//               >
//                 Do not have a account? Sign up now!
//               </Text>
//               <Text
//                 style={{
//                   textAlign: "center",
//                   marginTop: 80,
//                   textDecorationLine: "underline",
//                   color: "white"
//                 }}
//                 onPress={() => this.props.navigation.navigate("Forget")}
//               >
//                 Forget Password
//               </Text>
//             </Col>
//           </Row>
//         </ImageBackground>
//       </Container>
//     );
//   }
//   _signInAsync = async () => {
//     // await AsyncStorage.setItem('userToken', 'abc');
//     this.props.navigation.navigate("App");
//   };
// }

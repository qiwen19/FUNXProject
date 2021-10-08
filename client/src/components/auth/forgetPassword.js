import React from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Dimensions,
  Image
} from "react-native";
import HeaderLayout from "../layout/header";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Form,
  Input,
  Label,
  Title,
  Button,
  Text,
  Icon,
  Content,
  Item,
  Col
} from "native-base";
import Firebase from "../../../config/Firebase";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import { Row } from "react-native-easy-grid";
import { SafeAreaView } from "react-navigation";
SafeAreaView.setStatusBarHeight(0);

const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  backgroundImg: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%"
  },
  mainContainer: {
    flex: 1
    // paddingBottom: 100,
  },
  HeaderTextStyle: {
    fontSize: 18
  },
  resetBtnView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: 20
  },
  resetBtn: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // width: "90%",
    borderRadius: 2,
    backgroundColor: "rgba(0,79,173,1)",
    marginLeft: "auto",
    marginRight: "auto"
  },
  resetText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
    // textAlignVertical: 'center',  // this style is Android only
  },
  form: {
    marginHorizontal: 10
  },
  // titleStyle: {
  //   textTransform: "uppercase",
  //   textDecorationLine: "underline",
  //   color: "#143d4f",
  //   fontWeight: "800"
  // },
  title: {
    textTransform: "uppercase",
    textDecorationLine: "underline",
    color: "#143d4f",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 10
  },
  ImgStyle: {
    marginBottom: "10%",
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  colStyle: {
    justifyContent: "center",
    alignItems: "center"
  },
  lockIcon: {
    fontSize: 80
  },
  desc: {
    width: "80%",
    color: "rgba(0,42,90,1)",
    fontSize: 13,
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto"
  },
  // boxStyle: {
  //   backgroundColor: "rgba(251,247,247,0.25)",
  //   opacity: 1,
  //   borderRadius: 5,
  //   width: "80%",
  //   marginLeft: "auto",
  //   marginRight: "auto"
  // }
  ItemStyle: {
    marginTop: 25,
    borderBottomColor: "black",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default class ForgetPassword extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Container style={styles.container}>
          <ImageBackground
            style={styles.backgroundImg}
            source={require("../../../assets/GradientBG.png")}
          >
            {/* <HeaderLayout setHeader={"Forget Password"} /> */}
            <Header style={{ backgroundColor: "#2196f3" }}>
              <Left style={{ flex: 1 }}>
                <Button
                  transparent
                  onPress={() =>
                    this.props.navigation.navigate("LoginRegister")
                  }
                >
                  <Icon name="arrow-back"></Icon>
                </Button>
              </Left>
              <Body style={{ flex: 3 }}>
                <Title>Forget Password</Title>
              </Body>
              <Right style={{ flex: 1 }} />
            </Header>

            <KeyboardAvoidingView
              style={styles.mainContainer}
              behavior="padding"
              enabled
            >
              <Content style={{ marginTop: "20%" }}>
                <Image
                  source={require("../../../assets/logo1.png")}
                  resizeMode="contain"
                  style={styles.ImgStyle}
                />
                <Row size={50}>
                  <Col style={styles.colStyle}>
                    <Text style={styles.title}>Forgot your password?</Text>
                    <Text style={styles.desc}>
                      Enter your email address and we will send you a link to
                      reset your password.
                    </Text>
                    <EvilIconsIcon name="lock" style={styles.lockIcon} />
                  </Col>
                </Row>

                <Row size={50}>
                  <Col style={styles.colStyle}>
                    {/* <View> */}
                    <Form style={styles.form}>
                      <Item inlineLabel style={styles.ItemStyle}>
                        <Icon name="mail" style={{ color: "#143d4f" }} />
                        <Input
                          placeholder="Email: StanleyTan@gmail.com"
                          placeholderTextColor="rgba(20,61,79, 0.7)"
                          secureTextEntry={false}
                        />
                      </Item>
                      <View style={styles.resetBtnView}>
                        <Button
                          style={styles.resetBtn}
                          onPress={() =>
                            this.props.navigation.navigate("LoginRegister")
                          }
                        >
                          <Text style={styles.resetText}>Reset Password</Text>
                        </Button>
                      </View>
                    </Form>
                    {/* </View> */}
                  </Col>
                </Row>
              </Content>
            </KeyboardAvoidingView>
          </ImageBackground>
        </Container>
      </View>
    );
  }
}

// import React from "react";
// import { StyleSheet, ImageBackground, Image } from "react-native";
// import {
//   Container,
//   Header,
//   Left,
//   Body,
//   Right,
//   Form,
//   Input,
//   Label,
//   Button,
//   Text,
//   Icon,
//   Content,
//   Item,
//   Col
// } from "native-base";
// import Firebase from "../../../config/Firebase";
// import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

// import { Row } from "react-native-easy-grid";
// const styles = StyleSheet.create({
//   backgroundImg: {
//     width: "100%",
//     height: "100%"
//   },
//   HeaderTextStyle: {
//     fontSize: 18
//   },
//   btnStyle: {
//     backgroundColor: "rgba(0,79,173,1)",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 20,
//     marginHorizontal: 50,
//     marginBottom: 20
//   },
//   form: {
//     marginHorizontal: 10
//   },
//   ImgStyle: {
//     width: "50%",
//     height: "100%"
//   },
//   colStyle: {
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   lockIcon: {
//     fontSize: 80
//   },
//   title: {
//     textTransform: "capitalize",
//     color: "rgba(0,42,90,1)",
//     fontSize: 20,
//     marginBottom: 10
//   },
//   desc: {
//     width: "80%",
//     color: "rgba(0,42,90,1)",
//     fontSize: 13,
//     textAlign: "center",
//     marginLeft: "auto",
//     marginRight: "auto"
//   },
//   boxStyle: {
//     backgroundColor: "rgba(251,247,247,0.25)",
//     opacity: 1,
//     borderRadius: 5,
//     width: "80%",
//     marginLeft: "auto",
//     marginRight: "auto"
//   }
// });

// export default class ForgetPassword extends React.Component {
//   render() {
//     return (
//       <Container>
//         <ImageBackground
//           style={styles.backgroundImg}
//           source={require("../../../assets/GradientBG.png")}
//         >
//           <Header>
//             <Left>
//               <Button
//                 transparent
//                 onPress={() => this.props.navigation.navigate("Login")}
//               >
//                 <Icon name="arrow-back"></Icon>
//               </Button>
//             </Left>
//             <Body>
//               <Image
//                 source={require("../../../assets/logo1.png")}
//                 resizeMode="contain"
//                 style={styles.ImgStyle}
//               />
//             </Body>
//             <Right />
//           </Header>
//           <Row size={50}>
//             <Col style={styles.colStyle}>
//               <EvilIconsIcon name="lock" style={styles.lockIcon} />
//               <Text style={styles.title}>Forgot your password?</Text>
//               <Text style={styles.desc}>
//                 Enter your email address and we will send you a link to reset
//                 your password.
//               </Text>
//             </Col>
//           </Row>

//           <Row size={50}>
//             <Content>
//               <Form style={styles.form}>
//                 <Item regular style={styles.boxStyle}>
//                   <Icon name="mail"></Icon>
//                   <Input
//                     placeholder="Email: eg. StanleyTan@gmail.com"
//                     placeholderTextColor="rgba(73,116,163,1)"
//                     secureTextEntry={false}
//                   />
//                 </Item>
//                 <Button
//                   rounded
//                   style={styles.btnStyle}
//                   onPress={() => this.props.navigation.navigate("Login")}
//                 >
//                   <Text>Reset Password</Text>
//                 </Button>
//               </Form>
//             </Content>
//           </Row>
//         </ImageBackground>
//       </Container>
//     );
//   }
// }

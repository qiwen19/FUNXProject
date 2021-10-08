import React from "react";
import {
  StyleSheet,
  Image,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TouchableOpacity,
  View
} from "react-native";
import {
  Container,
  Header,
  Text,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Body,
  Left,
  Right,
  Content,
  Label
} from "native-base";
import Firebase from "../../../config/Firebase";
import { withNavigation } from "react-navigation";
import { Platform } from "@unimodules/core";

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
  },
  ImgStyle: {
    marginTop: "10%",
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    marginLeft: "auto",
    marginRight: "auto"
  },
  ItemStyle: {
    marginTop: 25,
    borderBottomColor: "black",
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  HeaderTextStyle: {
    fontSize: 20
  },
  form: {
    marginHorizontal: 10
  },
  titleStyle: {
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "800",
    textDecorationLine: "underline",
    color: "#143d4f"
  },
  registerBtnView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: 20
  },
  registerBtn: {
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
  registerText: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
    // textAlignVertical: 'center',  // this style is Android only
  }
});

class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
    dob: "",
    CM: "",
    Sex: "",
    Profilepic: "profile.jpg",
    hidden: true,
    hidden1: true
  };

  onIconPress = () => {
    //first password input field
    this.setState({ hidden: !this.state.hidden });
  };
  onIconPress1 = () => {
    //second password input field
    this.setState({ hidden1: !this.state.hidden1 });
  };

  handleSignUp = () => {
    // Method called when SIGN UP button is pressed
    const {
      email,
      password,
      name,
      cpassword,
      dob,
      CM,
      Sex,
      Profilepic
    } = this.state;
    var error_count = 0;
    if (name.length < 3) {
      // If name less than 3 letters
      alert("Please enter valid name.", [{ text: "OK" }], {
        cancelable: false
      });
      error_count += 1;
    }
    if (password.length < 6) {
      // If password less than 6 characters
      alert("Password has to be at least 6 characters.", [{ text: "OK" }], {
        cancelable: false
      });
      error_count += 1;
    }
    if (password != cpassword) {
      // If password and confirm password field do not match
      alert("Password do not match.", [{ text: "OK" }], { cancelable: false });
      error_count += 1;
    }

    if (error_count == 0) {
      // If no error
      Firebase.auth()
        .createUserWithEmailAndPassword(email, password) // Create user using email and password
        .then(data =>
          this.createUserData(
            data.user.uid,
            email,
            name,
            password,
            dob,
            CM,
            Sex,
            Profilepic
          )
        ) // Post success call method
        .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch user creation error
    }
  };

  createUserData(uid, email, name, password, dob, CM, Sex, Profilepic) {
    // Post user creation success method
    Firebase.database()
      .ref("User/")
      .child(uid) // Select User table with generated User id as PRI KEY
      .set({
        Email: email,
        Name: name,
        Password: password,
        Points: 0,
        DOB: dob,
        CM: CM,
        Sex: Sex,
        Profilepic: Profilepic
      }) // Insert values into table
      .then(() => this.props.navigation.navigate("LoginPageTab")) // Post success navigate to HomePage
      .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
  }

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
            // keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
            enabled
          >
            <Content>
              <Image
                resizeMode="contain"
                style={styles.ImgStyle}
                source={require("../../../assets/logo1.png")}
              />
              <Text style={styles.titleStyle}>Create Account</Text>
              <Form style={styles.form}>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="person" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Full Name"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name })}
                  />
                </Item>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="mail" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Email"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })}
                  />
                </Item>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="calendar" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="DOB (DD-MM-YYYY)"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    value={this.state.dob}
                    onChangeText={dob => this.setState({ dob })}
                  />
                </Item>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="md-bus" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Commute Method (Bus,Train)"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    value={this.state.CM}
                    onChangeText={CM => this.setState({ CM })}
                  />
                </Item>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="transgender" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Gender (Male,Female)"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    value={this.state.Sex}
                    onChangeText={Sex => this.setState({ Sex })}
                  />
                </Item>

                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="lock" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Password"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    secureTextEntry={this.state.hidden}
                    autoCompleteType="off"
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })}
                  />
                  <TouchableOpacity onPress={this.onIconPress}>
                    <Icon name={this.state.hidden ? "eye-off" : "eye"} />
                  </TouchableOpacity>
                </Item>
                <Item inlineLabel style={styles.ItemStyle}>
                  <Icon name="lock" style={{ color: "#143d4f" }} />

                  <Input
                    placeholder="Confirm Password"
                    placeholderTextColor="rgba(20,61,79, 0.7)"
                    secureTextEntry={this.state.hidden1}
                    autoCompleteType="off"
                    value={this.state.cpassword}
                    onChangeText={cpassword => this.setState({ cpassword })}
                  />
                  <TouchableOpacity onPress={this.onIconPress1}>
                    <Icon name={this.state.hidden1 ? "eye-off" : "eye"} />
                  </TouchableOpacity>
                </Item>

                <View style={styles.registerBtnView}>
                  <Button
                    style={styles.registerBtn}
                    onPress={this.handleSignUp}
                  >
                    <Text style={styles.registerText}>Sign up</Text>
                  </Button>
                </View>
              </Form>
            </Content>
          </KeyboardAvoidingView>
        </ImageBackground>
      </Container>
    );
  }
}
export default withNavigation(Register);
// import React from "react";
// import { StyleSheet, Image, ImageBackground } from "react-native";
// import {
//   Container,
//   Header,
//   Text,
//   Form,
//   Item,
//   Input,
//   Button,
//   Icon,
//   Body,
//   Left,
//   Right,
//   Content,
//   Label
// } from "native-base";
// import Firebase from "../../../config/Firebase";

// const styles = StyleSheet.create({
//   backgroundImg: {
//     width: "100%",
//     height: "100%"
//   },
//   imgStyle: {
//     marginLeft: "auto",
//     marginRight: "auto"
//   },
//   ItemStyle: {
//     marginTop: 25
//   },
//   HeaderTextStyle: {
//     fontSize: 20
//   },
//   form: {
//     marginHorizontal: 10
//   },
//   titleStyle: {
//     textTransform: "uppercase",
//     textAlign: "center",
//     marginBottom: 10
//   },
//   boxStyle: {
//     backgroundColor: "rgba(251,247,247,0.25)",
//     opacity: 1,
//     borderRadius: 5,
//     marginBottom: 10,
//     borderColor: "rgba(251,247,247,0.25)",
//     width: "80%",
//     marginLeft: "auto",
//     marginRight: "auto"
//   },
//   btnStyle: {
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//     marginBottom: 20,
//     marginHorizontal: 50,
//     backgroundColor: "rgba(0,79,173,1)"
//   }
// });

// export default class Login extends React.Component {
//   state = {
//     name: "",
//     email: "",
//     password: "",
//     cpassword: "",
//     dob: "",
//     CM: ""
//   };

//   handleSignUp = () => {
//     // Method called when SIGN UP button is pressed
//     const { email, password, name, cpassword } = this.state;
//     var error_count = 0;
//     if (name.length < 3) {
//       // If name less than 3 letters
//       alert("Please enter valid name.", [{ text: "OK" }], {
//         cancelable: false
//       });
//       error_count += 1;
//     }
//     if (password.length < 6) {
//       // If password less than 6 characters
//       alert("Password has to be at least 6 characters.", [{ text: "OK" }], {
//         cancelable: false
//       });
//       error_count += 1;
//     }
//     if (password != cpassword) {
//       // If password and confirm password field do not match
//       alert("Password do not match.", [{ text: "OK" }], { cancelable: false });
//       error_count += 1;
//     }

//     if (error_count == 0) {
//       // If no error
//       Firebase.auth()
//         .createUserWithEmailAndPassword(email, password) // Create user using email and password
//         .then(data =>
//           this.createUserData(data.user.uid, email, name, password, dob, CM)
//         ) // Post success call method
//         .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch user creation error
//     }
//   };

//   createUserData(uid, email, name, password, dob) {
//     // Post user creation success method
//     Firebase.database()
//       .ref("User/")
//       .child(uid) // Select User table with generated User id as PRI KEY
//       .set({ Email: email, Name: name, Password: password, Points: 0, dob, CM }) // Insert values into table
//       .then(() => this.props.navigation.navigate("Login")) // Post success navigate to HomePage
//       .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
//   }

//   render() {
//     return (
//       <Container>
//         <ImageBackground
//           style={styles.backgroundImg}
//           source={require("../../../assets/GradientBG.png")}
//         >
//           <Header transparent>
//             <Left>
//               <Button
//                 transparent
//                 onPress={() => this.props.navigation.navigate("Login")}
//               >
//                 <Icon name="arrow-back" />
//               </Button>
//             </Left>
//             <Body>
//               <Text style={styles.HeaderTextStyle}>Sign up</Text>
//             </Body>
//             <Right></Right>
//           </Header>
//           <Content>
//             <Image
//               style={styles.imgStyle}
//               source={require("../../../assets/logo1.png")}
//             ></Image>
//             <Text style={styles.titleStyle}>Create Account</Text>
//             <Form style={styles.form}>
//               <Item regular style={styles.boxStyle}>
//                 <Icon name="person"></Icon>

//                 <Input
//                   placeholder="Full Name"
//                   value={this.state.name}
//                   onChangeText={name => this.setState({ name })}
//                 />
//               </Item>
//               <Item regular style={styles.boxStyle}>
//                 <Icon name="mail"></Icon>

//                 <Input
//                   placeholder="Mail"
//                   value={this.state.email}
//                   onChangeText={email => this.setState({ email })}
//                 />
//               </Item>
//               <Item regular style={styles.boxStyle}>
//                 <Icon name="mail"></Icon>

//                 <Input
//                   placeholder="DOB(DD-MM-YYYY)"
//                   value={this.state.dob}
//                   onChangeText={dob => this.setState({ dob })}
//                 />
//               </Item>
//               <Item regular style={styles.boxStyle}>
//                 <Icon name="mail"></Icon>

//                 <Input
//                   placeholder="Commute Method"
//                   value={this.state.CM}
//                   onChangeText={CM => this.setState({ CM })}
//                 />
//               </Item>

//               <Item regular style={styles.boxStyle}>
//                 <Icon name="lock"></Icon>

//                 <Input
//                   placeholder="Password"
//                   secureTextEntry={true}
//                   autoCompleteType="off"
//                   value={this.state.password}
//                   onChangeText={password => this.setState({ password })}
//                 />
//               </Item>
//               <Item regular style={styles.boxStyle}>
//                 <Icon name="lock"></Icon>

//                 <Input
//                   placeholder="Confirm Password"
//                   secureTextEntry={true}
//                   value={this.state.cpassword}
//                   onChangeText={cpassword => this.setState({ cpassword })}
//                 />
//               </Item>

//               <Button
//                 rounded
//                 style={styles.btnStyle}
//                 onPress={this.handleSignUp}
//               >
//                 <Text>Sign up</Text>
//               </Button>
//             </Form>
//           </Content>
//         </ImageBackground>
//       </Container>
//     );
//   }
// }

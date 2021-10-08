import React from "react";
import {
  StyleSheet,
  Image,
  AsyncStorage,
  ScrollView,
  ImageBackground,
  View
} from "react-native";
import { Card, CardItem, Text, Button, Icon } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// import thumb from "../../../assets/logo1.png";
import { withNavigation } from "react-navigation";
import { withNavContext } from "../navigation/navContent";
const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    width: 170,
    height: 170,
    borderWidth: 4,
    borderColor: "#01C89E",
    marginBottom: 10
    // marginTop:10,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35
  },
  container: {
    flex: 1
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35
  },
  headerColumn: {
    // backgroundColor: 'transparent',
    alignItems: "center"
  },
  title: {
    // fontWeight: 'bold',
    color: "grey"
  },
  iconViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginRight: "2%"
  },
  iconStyle: {
    textAlign: "center",
    fontSize: 25,
    color: "#143d4f"
  },
  userNameText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center"
  },
  emailText: {
    color: "#FFF",
    textAlign: "center"
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto"
  }
});

class ProfileCard extends React.Component {
  clearContext() {
    console.log("CLEARING CONTEXT");
    this.props.navProvider.setStart(null, null);
    this.props.navProvider.setEnd(null, null);
    this.props.navProvider.setPolyLine(empty);
    this.props.navProvider.setSelect(null);
    this.props.navProvider.setDir(empty);
    this.props.navProvider.setTimeSel(null);
    this.props.navProvider.setTime(empty);
  }
  _signOutAsync = async () => {
    // await AsyncStorage.clear();
    empty = [];
    await this.clearContext();
    this.props.navigation.navigate("Auth");
  };

  render() {
    console.disableYellowBox = true;
    return (
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={2}
          source={require("../../../assets/map.jpg")}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.avatar}
              source={require("../../../assets/profile.jpg")}
            />
            <Text style={styles.userNameText}>{this.props.userName}</Text>
            <Text style={styles.emailText}>{this.props.Email}</Text>
          </View>
        </ImageBackground>
        <Card style={{ flex: 0 }}>
          <CardItem bordered>
            <View style={styles.iconViewStyle}>
              <Icon name="calendar" style={styles.iconStyle} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Date of Birth: </Text>
              <Text>{this.props.DOB}</Text>
            </View>
          </CardItem>

          <CardItem style={{ flexDirection: "row" }} bordered>
            <View style={styles.iconViewStyle}>
              <Icon name="transgender" style={styles.iconStyle} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Sex: </Text>
              <Text>{this.props.Sex}</Text>
            </View>
          </CardItem>

          <CardItem bordered>
            <View style={styles.iconViewStyle}>
              <Icon name="md-bus" style={styles.iconStyle} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Commute Method: </Text>
              <Text>{this.props.CM}</Text>
            </View>
          </CardItem>

          <CardItem bordered>
            <View style={styles.iconViewStyle}>
              <Icon name="calculator" style={styles.iconStyle} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Points: </Text>
              <Text>{this.props.points}</Text>
            </View>
          </CardItem>
        </Card>
        {/* <Button
          backgroundColor="#03A9F4"
          // rounded
          style={styles.btnStyle}
        >
          <Text>Edit Profile</Text>
        </Button> */}
        <Button
          backgroundColor="rgba(0,79,173,1)"
          // rounded
          onPress={() => this._signOutAsync()}
          style={styles.btnStyle}
        >
          <Text>Logout</Text>
        </Button>
      </ScrollView>
    );
  }
}
export default withNavigation(withNavContext(ProfileCard));
// import React from "react";
// import { StyleSheet, Image, AsyncStorage } from "react-native";
// import {
//   Card,
//   Left,
//   Thumbnail,
//   Body,
//   CardItem,
//   Text,
//   Button
// } from "native-base";
// import thumb from "../../../assets/logo1.png";

// export default class ProfileCard extends React.Component {
//   render() {
//     console.disableYellowBox = true;
//     return (
//       <Card style={{ flex: 0, height: 500 }}>
//         <CardItem header bordered>
//           <Left>
//             <Thumbnail small source={require("../../../assets/logo1.png")} />
//             <Body>
//               <Text>{this.props.userName}</Text>
//               <Text note>{this.props.Email}</Text>
//             </Body>
//           </Left>
//         </CardItem>
//         <CardItem bordered>
//           <Body>
//             <Text>
//               Date of Birth:<Text>{this.props.DOB}</Text>
//             </Text>
//             <Text>
//               Sex:<Text>{this.props.Sex}</Text>
//             </Text>
//             <Text>
//               Commute Method:<Text>{this.props.CM}</Text>
//             </Text>
//           </Body>
//         </CardItem>
//         <CardItem bordered>
//           <Body>
//             <Text>
//               Points:<Text>{this.props.points}</Text>
//             </Text>
//           </Body>
//         </CardItem>
//       </Card>
//     );
//   }
// }

import React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import { Container, Text, Form, Item, Input, Button, Icon } from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import HeaderLayout from "../layout/header";
import RewardDeck from "../rewards/rewardDeck";
import Firebase from "../../../config/Firebase";
const styles = StyleSheet.create({
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
    alignItems: "center",
    marginTop: 50,
    marginHorizontal: 50,
    marginBottom: 20
  }
});

export default class Rewards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  async componentDidMount() {
    this.item = await this.generateRewardList();
    // console.log(this.state.items);
  }
  async generateRewardList() {
    // this.setState({ items: [1, 2, 3, 4] });
    let data = null;
    await Firebase.database()
      .ref("/Rewards")
      .once("value", snapshot => {
        data = snapshot.val();
      });

    if (data == null) {
      return false;
    } else {
      for (var r in data) {
        var obj = {
          title: r,
          desc: data[r].desc,
          points_required: data[r].points_required
        };
        this.setState({ items: [...this.state.items, obj] });
      }
      // return data_view;
      return true;
    }
  }
  render() {
    console.disableYellowBox = true;
    return (
      <Container>
        {this.state.items.length > 0 ? (
          <React.Fragment>
            <HeaderLayout setHeader={"Rewards"} />
            <RewardDeck
              cards={this.state.items}
              image={require("../../../assets/grab.png")}
            />
          </React.Fragment>
        ) : (
          <Text>No item</Text>
        )}
      </Container>
    );
  }
}

// export default class RewardPage extends React.Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         {this.state.items.map(it => (
//           <View key={it}>
//             <Text>{it.desc}</Text>
//             <Text>{it.points_required}</Text>
//           </View>
//         ))}
//       </View>
//     );
//   }
// }

import React from "react";
import { StyleSheet, Image } from "react-native";
import {
  DeckSwiper,
  View,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Container,
  Left,
  Body,
  Button,
  Icon
} from "native-base";
import Firebase from "../../../config/Firebase";
const styles = StyleSheet.create({
  claimBtn: {
    flex: 1,
    justifyContent: "center"
  }
});
export default class RewardDeck extends React.Component {
  _onDeckPress = ds => {
    console.log(ds._root.state.selectedItem);
    // console.log(this);
  };
  state = {
    image: null,
    data: null,
    user_points: 0
  };
  async handleSubmit(r) {
    // Method called when SIGN UP button is pressed
    // const { data } = this.state;
    let selectedObj = r._root.state.selectedItem;
    console.log(selectedObj.points_required);
    await Firebase.database()
      .ref("/User/" + Firebase.auth().currentUser.uid)
      .once("value", snapshot => {
        this.setState({ user_points: snapshot.val().Points });
      });

    if (this.state.user_points < selectedObj.points_required) {
      alert("Not enough points.", [{ text: "OK" }], { cancelable: false });
      return false;
    } else {
      var user_points = this.state.user_points - selectedObj.points_required;
      Firebase.database()
        .ref("/User")
        .child(Firebase.auth().currentUser.uid) // Select Feedbacktable with UID and timestamp as PRI KEY
        .update({ Points: user_points }) // Insert values into table
        .then(this.createTransaction(selectedObj)) // Post success navigate to HomePage
        .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
    }
  }

  createTransaction(r) {
    const { data, user_points } = this.state;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    Firebase.database()
      .ref("/Transactions")
      .child(
        Firebase.auth().currentUser.uid +
          "_" +
          date +
          month +
          year +
          hours +
          min +
          sec
      ) // Select Feedbacktable with UID and timestamp as PRI KEY
      .set({
        User: Firebase.auth().currentUser.uid,
        Reward: r,
        Date: date + "/" + month + "/" + year,
        Time: hours + ":" + min + ":" + sec
      }) // Insert values into table
      .then(
        alert(
          "Claimed rewards successfully",
          [
            { text: "OK", onPress: () => this.props.navigation.navigate("App") }
          ],
          { cancelable: false }
        )
      ) // Post success navigate to HomePage
      .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
  }
  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            ref={c => (this._deckSwiper = c)}
            dataSource={this.props.cards}
            renderItem={item => (
              <Card style={{ elevation: 3 }}>
                <CardItem bordered>
                  <Left>
                    <Thumbnail source={this.props.image} />
                    <Body>
                      <Text>{item.title}</Text>
                      <Text note>{item.desc}</Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody bordered>
                  <Image
                    style={{ height: 300, flex: 1 }}
                    source={this.props.image}
                  />
                </CardItem>
                <CardItem>
                  <Text>
                    Points: <Text>{item.points_required}</Text>{" "}
                  </Text>
                </CardItem>
              </Card>
            )}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flex: 1,
            position: "absolute",
            bottom: 50,
            left: 50,
            right: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            style={styles.claimBtn}
            onPress={() => this.handleSubmit(this._deckSwiper)}
            backgroundColor="rgba(0,79,173,1)"
          >
            <Icon name="gift" />
            <Text>Claim Rewards</Text>
          </Button>
        </View>
      </Container>
    );
  }
}

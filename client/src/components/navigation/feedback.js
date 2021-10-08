import React from "react";
import { StyleSheet, Image, Platform, StatusBar } from "react-native";
import {
  Container,
  Form,
  Item,
  Input,
  Button,
  Icon,
  Header,
  Left,
  Body,
  Right,
  Grid,
  Row,
  Title,
  H1,
  Textarea,
  Text,
  Content,
  Col
} from "native-base";
import Firebase from "../../../config/Firebase";
import HeaderLayout from "../layout/header";

const styles = StyleSheet.create({
  conStyle: {
    ...Platform.select({
      android: {
        marginTop: StatusBar.currentHeight
      }
    })
  },

  ImgStyle: {
    width: "50%",
    height: "100%",
    marginTop: 50
  },
  FormStyle: {
    justifyContent: "center",
    alignItems: "center"
    // marginHorizontal:50
  },
  ItemStyle: {
    alignItems: "center"
  },
  ItemStyle: {
    marginBottom: 25,
    backgroundColor: "#DCE6EE",
    borderRadius: 5,
    backgroundColor: "#DCE6EE"
  },
  feedbackText: {
    backgroundColor: "#DCE6EE",
    borderRadius: 5,
    backgroundColor: "#DCE6EE",
    width: "100%"
  },
  btnStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    width: "40%",
    height: 40,
    marginRight: 10,
    // marginHorizontal: 50,
    // marginBottom: 20
    backgroundColor: "rgba(0,92,203,1)"
  },
  titleStyle: {
    textAlign: "center",
    marginBottom: 20
  }
});

export default class Feedback extends React.Component {
  state = {
    image: null,
    feedback: ""
  };

  handleSubmit(feedback) {
    // Method called when SIGN UP button is pressed
    if (feedback.length == 0) {
      // If name less than 3 letters
      alert("Please enter feedback.", [{ text: "OK" }], { cancelable: false });
      return false;
    }
    this.createFeedbackData(Firebase.auth().currentUser.uid, feedback);
    return true;
  }

  createFeedbackData(uid, feedback) {
    // Post user creation success method
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    Firebase.database()
      .ref("Feedback/")
      .child(uid + "_" + date + month + year + hours + min + sec) // Select Feedbacktable with UID and timestamp as PRI KEY
      .set({
        UID: uid,
        Feedback: feedback,
        Date: date + "/" + month + "/" + year,
        Time: hours + ":" + min + ":" + sec
      }) // Insert values into table
      .then(
        alert(
          "Feedback received successfully",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.navigate("AccountPage")
            }
          ],
          { cancelable: false }
        )
      ) // Post success navigate to HomePage
      .catch(error => alert(error, [{ text: "OK" }], { cancelable: false })); // Catch insert data errors
  }

  render() {
    let { image } = this.state;
    return (
      <Container style={styles.conStyle}>
        <HeaderLayout setHeader={"Feedback"} />

        <Col
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20
          }}
        >
          <H1 style={styles.titleStyle}>Feedback</H1>
          <Text style={styles.titleStyle}>
            Your feedback is important for us.
          </Text>
          <Form style={styles.FormStyle}>
            <Item regular style={styles.ItemStyle}>
              <Icon name="contact"></Icon>
              <Input
                placeholder="eg. StanleyTan88@gmail.com"
                placeholderTextColor="rgba(73,116,163,1)"
                secureTextEntry={false}
              ></Input>
            </Item>

            <Textarea
              rowSpan={5}
              bordered
              placeholder="Tell us how to improve"
              style={styles.feedbackText}
            />
            <Button onPress={this._pickImage} style={styles.btnStyle}>
              <Text>Upload Image</Text>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </Button>
            <Grid
              style={{
                flex: 1,
                flexDirection: "row"
              }}
            >
              <Button onPress={this.handleSubmit} style={styles.btnStyle}>
                <Text>Send Feedback</Text>
              </Button>

              <Button
                onPress={() => this.props.navigation.navigate("App")}
                style={styles.btnStyle}
              >
                <Text>Close Feedback</Text>
              </Button>
            </Grid>
          </Form>
        </Col>
      </Container>
    );
  }
}

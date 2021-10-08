import React from "react";
import { StyleSheet, Image } from "react-native";
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
import { withNavigation } from "react-navigation";
import { withNavContext } from "../navigation/navContent";
const styles = StyleSheet.create({
  ImgStyle: {
    width: "50%",
    height: "100%",
    marginTop: 50
  },
  titleStyle: {
    textAlign: "center",
    marginBottom: 20
  }
});

class TimePage extends React.Component {
  setTimeSelect = () => {
    // this.props.navProvider.setTimeSelect(true);
    this.props.navigation.navigate("NavigationScreen", { sel: 1 });
  };
  render() {
    return (
      <Container>
        <Col
          style={{
            width: "90%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 20
          }}
        >
          <H1 style={styles.titleStyle}>Time Based Challenge</H1>
          <Text style={styles.titleStyle}>Time Challenge Rules</Text>
          <Text>
            1. Time Challenge will start upon clicking on the start button
          </Text>
          <Text>
            2. Finish your first mile or last mile within the time given
          </Text>
          <Text>3. Points will be give if challenge is completed.</Text>

          <Text>4. Enjoy and have fun.</Text>

          <Button
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20
            }}
            onPress={this.setTimeSelect}
          >
            <Text>Start Time Challenge</Text>
          </Button>
        </Col>
      </Container>
    );
  }
}
export default withNavigation(withNavContext(TimePage));

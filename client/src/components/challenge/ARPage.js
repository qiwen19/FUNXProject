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
// import Firebase from "../../../config/Firebase";
import { withNavigation } from "react-navigation";
import { withNavContext } from "../navigation/navContent";
const styles = StyleSheet.create({
  ImgStyle: {
    width: "50%",
    height: "100%",
    marginTop: 50
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
  titleStyle: {
    textAlign: "center",
    marginBottom: 20
  }
});

class ARPage extends React.Component {
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
          <H1 style={styles.titleStyle}>AR Challenge</H1>
          <Text style={styles.titleStyle}>Rules of AR Challenge</Text>
          <Text>1. AR will start upon clicking on the start button</Text>
          <Text>
            2. You have 5 chance to tap on the screen to look for the item
          </Text>
          <Text>
            3. When a gold coin or bag is found, you will gain 1 point.
          </Text>
          <Text>4. When a empty box is found, no points will be given.</Text>
          <Text>5. Up to 5points will be collected in total.</Text>
          <Text>6. Enjoy and have fun.</Text>
          {/* {console.log(this.props.navProvider.directDetails)} */}
          {/* <Text>
            {this.props.navProvider.start.Lat}
            <Text>
              <Text>////...//</Text>
              {this.props.navProvider.start.Long}
            </Text>
          </Text>
          <Text>
            {this.props.navProvider.end.Lat}
            <Text>
              <Text>////...//</Text>
              {this.props.navProvider.end.Long}
            </Text>
          </Text>
          <Text>{this.props.navProvider.route_selected}</Text> */}
          <Button
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 20
            }}
            onPress={() => this.props.navigation.navigate("ARScreen")}
          >
            <Text>Start AR Challenge</Text>
          </Button>
        </Col>
      </Container>
    );
  }
}

export default withNavigation(withNavContext(ARPage));

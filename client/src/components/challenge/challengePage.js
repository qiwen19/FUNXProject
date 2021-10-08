import React from "react";
import { withNavigation } from "react-navigation";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Segment,
  Content,
  Text
} from "native-base";
import ARPage from "./ARPage";
import TimePage from "./TimePage";
import { withNavContext } from "../navigation/navContent";
class ChallengePage extends React.Component {
  state = {
    activePage: 1
  };

  selectSeg = activePage => () => this.setState({ activePage });
  _renderComponent = () => {
    if (this.state.activePage === 1) {
      return <ARPage />;
    } else if (this.state.activePage === 2) {
      return <TimePage />;
    }
  };

  render() {
    console.disableYellowBox = true;
    return (
      <Container>
        <Header hasSegment>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("NavigationScreen")}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Challenge</Title>
          </Body>
          <Right></Right>
        </Header>
        <Segment>
          <Button
            first
            active={this.state.activePage === 1}
            onPress={this.selectSeg(1)}
          >
            {/* <Text>{this.props.navProvider.start.Lat}</Text> */}
            <Text>AR Challenge</Text>
          </Button>
          <Button
            last
            active={this.state.activePage === 2}
            onPress={this.selectSeg(2)}
          >
            <Text>Time Based Challenge</Text>
          </Button>
          <Button
            last
            active={this.state.activePage === 3}
            onPress={() => this.props.navigation.navigate("NavigationScreen")}
          >
            <Text>Skip Challenge</Text>
          </Button>
        </Segment>

        <Content padder>{this._renderComponent()}</Content>
      </Container>
    );
  }
}
export default withNavigation(withNavContext(ChallengePage));

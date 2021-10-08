import React from "react";
import { Container, Header, Left, Body, Right, Title } from "native-base";

export default class HeaderLayout extends React.Component {
  render() {
    return (
      <Header style={{ backgroundColor: "#2196f3" }}>
        <Left style={{ flex: 1 }}></Left>
        <Body style={{ flex: 1, alignItems: "center" }}>
          <Title>{this.props.setHeader}</Title>
        </Body>
        <Right style={{ flex: 1 }}></Right>
      </Header>
    );
  }
}

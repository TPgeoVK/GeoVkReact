import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import CheckinCardList from './CheckinCardList'

export default class CheckinsPage extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <CheckinCardList />
        </Content>
      </Container>
    );
  }
}
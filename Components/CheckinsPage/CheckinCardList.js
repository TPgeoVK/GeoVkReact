import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import CheckinCard from './CheckinCard'

export default class CheckinCardList extends Component {
  render() {
    return (
        <Container>
            <CheckinCard />
            <CheckinCard />
        </Container>
        );
    }
}
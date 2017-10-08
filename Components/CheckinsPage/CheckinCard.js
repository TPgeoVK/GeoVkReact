import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

export default class CheckinCard extends Component {
  render() {
    return (
        <Card style={{flex: 0}}>
            <CardItem>
                <Left>
                    <Thumbnail source={{uri: 'http://wallpaper.sc/en/ipad/wp-content/uploads/2014/10/ipad-2048x2048-thumbnail_00233-256x256.jpg'}} />
                    <Body>
                        <Text>Brighton Beach</Text>
                        <Text note>April 15, 2016</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>
                        Brighton Beach is an oceanside neighborhood in the southern portion of the New York City borough of Brooklyn, along the Coney Island peninsula.
                    </Text>
                </Body>
            </CardItem>
            <CardItem>
                <Left>
                    <Button transparent textStyle={{color: '#87838B'}}>
                        <Icon name="logo-github" />
                        <Text>1,925 stars</Text>
                    </Button>
                </Left>
            </CardItem>   
        </Card>
        )
    }
}
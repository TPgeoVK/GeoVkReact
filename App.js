import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import AppHeader from './Components/AppHeader'
import AppFooter from './Components/AppFooter'

export default class App extends Component {
    constructor() {
      super();
      this.state = {
        isReady: false
      };
    }
  
    async componentWillMount() {
      await Expo.Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
      });
  
      this.setState({ isReady: true });
    }

    render() {
      if (!this.state.isReady) {
        return <Expo.AppLoading />;
      }
      return (
        <Container>
          <AppHeader />
          <Content>
            <Text>Its working!</Text>
          </Content>
          <AppFooter />
        </Container>
      );
    }
  }
import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView, StatusBar} from 'react-native';
import {Container, Button, Text} from 'native-base';
import styles from './styleLoginPage'
import LoginView from './LoginView'
import {NavigationActions} from 'react-navigation';

export default class LoginPage extends Component {

	render() {
		return (
			<Container>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
				<View style={styles.content}>
					<Image style={styles.image} source={require('../../assets/logo.png')}/>
					<Button style={styles.button}
					        onPress={() => {
						        this.props.navigation.navigate('LoginView')
					        }}>
						<Text>Войти через ВКонтакте</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

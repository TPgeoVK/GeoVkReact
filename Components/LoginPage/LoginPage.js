import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import styles from './styleLoginPage'
import LoginView from './LoginView'


export default class LoginPage extends Component {


	render() {
		return (
			<Container>
				<View style={styles.content}>
					<Image style={styles.image}source={require('../../assets/logo.png')}/>
					<Button style={styles.button}
					        onPress={() => {this.props.navigation.navigate('LoginView')}}>
						<Text>Войти через ВКонтакте</Text>
					</Button>
				</View>
			</Container>
		);
	}
}





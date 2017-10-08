import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import styles from './styles'

export default class LoginPage extends Component {
	render() {
		return (
			<Container>
				<View style={styles.content}>
					<Image style={styles.image}source={require('../../assets/logo.png')}/>
					<Button style={styles.button}>
						<Text>Войти через ВКонтакте</Text>
					</Button>
				</View>
			</Container>
		);
	}
}


import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView,StatusBar} from 'react-native';
import {Container, Button, Text} from 'native-base';

import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator,NavigationActions } from 'react-navigation';

import {AsyncStorage} from 'react-native';
import Cookie from 'react-native-cookie';

export default class SettingsPage extends Component {

	render() {
		const _logOut = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token !== null) {
				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token
					})

				}).then(()=>{console.log('logout')})

			}

			Cookie.clear();
			await AsyncStorage.removeItem('token');
			console.log(await AsyncStorage.getItem('token'))
			this.props.navigation.dispatch(NavigationActions.reset(
				{
					index: 0,
					key: null,
					actions: [
						NavigationActions.navigate({routeName: 'LoginPage'})
					]
				}
			));
		}
		return (
			<Container>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
				<View >
					<Button full light
					        onPress={() =>{
						        this.props.navigation.navigate('Login');
						        _logOut()
					        } } //TODO
					>
						<Text>Выйти</Text>
					</Button>
				</View>
			</Container>
		);
	}
}

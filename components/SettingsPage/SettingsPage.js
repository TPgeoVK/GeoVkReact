import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView,StatusBar} from 'react-native';
import {Container, Button, Text, Footer, FooterTab,Content} from 'native-base';
import AppHeader from '../Header/Header'
import DevelopersCardList from './DevelopersCardList'

import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator,NavigationActions } from 'react-navigation';

import {AsyncStorage} from 'react-native';
import Cookie from 'react-native-cookie';

export default class SettingsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			developersId: [305329040,29817384,13796551],
			developersList: [],
		};
	}

	componentDidMount() {

		AsyncStorage.getItem('token', (err, result) => {
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/latest?token=' + result)
				.then((response) => response.json())
				.then(async (responseJson) => {
					this.setState({
						developersList: responseJson,
					});
					console.log(this.state);
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}

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
						NavigationActions.navigate({routeName: 'Custom Tabs'})
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
				<AppHeader title={'О приложении'}/>
				<Content>
					<DevelopersCardList developers={this.state.developersList}/>
				</Content>
				<Footer>
					<FooterTab>
						<Button full light
						        onPress={() =>{
							        this.props.navigation.navigate('Login');
							        _logOut()
						        } } //TODO
						>
							<Text>Выйти</Text>
						</Button>
					</FooterTab>
				</Footer>

			</Container>
		);
	}
}

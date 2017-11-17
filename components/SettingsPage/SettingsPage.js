import React, {Component} from 'react';
import {
	AppRegistry,
	Image,
	StyleSheet,
	View,
	WebView,
	StatusBar,
	ActivityIndicator,
	ScrollView,
	RefreshControl
} from 'react-native';
import {Container, Button, Text, Footer, FooterTab, Content, Card, CardItem} from 'native-base';
import AppHeader from '../Header/Header'
import DevelopersCardList from './DevelopersCardList'
import styles from './styleSettingsPage'

import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator, NavigationActions
} from 'react-navigation';

import {AsyncStorage} from 'react-native';
import Cookie from 'react-native-cookie';

export default class SettingsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			developersId: '305329040,29817384,13796551',
			developersList: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('developersList').then((item) => {
			console.log('developersList', JSON.parse(item))
			if (JSON.parse(item) === null) {
				AsyncStorage.getItem('token', (err, result) => {
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/users?token=' + result + '&ids=' + this.state.developersId)
						.then((response) => response.json())
						.then((responseJson) => {
							this.setState({
								developersList: responseJson,
								isLoading: false,
							});
							console.log(this.state);
						})
						.catch((error) => {
							console.error(error);
						});
				});
			} else {
				this.setState({
					developersList: JSON.parse(item),
					isLoading: false,
				})
			}
		});
	}

	_onRefresh() {
		this.setState({refreshing: true});
		AsyncStorage.removeItem('developersList');
		AsyncStorage.getItem('token', (err, result) => {
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/users?token=' + result + '&ids=' + this.state.developersId)
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState({
						developersList: responseJson,
						isLoading: false,
					});
					console.log(this.state);
				})
				.catch((error) => {
					console.error(error);
				});
		})
			.then(() => {
					this.setState({refreshing: false});
				}
			);
	}


	render() {
		const _logOut = async () => {
			const token = await AsyncStorage.clear();
			if (token !== null) {
				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/auth/logout', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token
					})

				}).then(() => {
					console.log('logout')
				})

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

		if (this.state.isLoading) {
			return (
				<View style={{flex: 1}}>
					<ActivityIndicator size={70} color={'#3d5f86'} style={styles.activityIndicator}/>
				</View>
			);
		}
		return (
			<Container>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
				<AppHeader title={'О приложении'}/>
				<Content style={{flex: 1}}><ScrollView
					refreshControl={
						<RefreshControl
							tintColor='#3d5f86'
							colors={['#3d5f86']}
							refreshing={this.state.refreshing}
							onRefresh={this._onRefresh.bind(this)}/>}>
					<DevelopersCardList developers={this.state.developersList}/>
				</ScrollView></Content>


				<Button full light
				        onPress={() => {
					        this.props.navigation.navigate('Login');
					        _logOut()
				        }} //TODO
				>
					<Text style={styles.button}>Выйти</Text>
				</Button>


			</Container>
		);
	}
}

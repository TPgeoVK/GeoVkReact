import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, AsyncStorage, StatusBar,ActivityIndicator} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import AppHeader from '../Header/Header'
import FriendsTab from './FriendsTab';
import CommunitiesTab from './CommunitiesTab';




export default class RecommendationsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			recommendationsList: [],
		};
	}
	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
				let lat = parseFloat(position.coords.latitude);
				let long = parseFloat(position.coords.longitude);
				AsyncStorage.multiSet([
					["latitude", lat.toString()],
					["longitude", long.toString()]
				])
			},
			(error)=>{console.log(error)},
			// {enableHighAccuracy:true,timeout:20000,maximumAge:1000}
			)


		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			AsyncStorage.multiSet([
				["latitude", lat.toString()],
				["longitude", long.toString()]
			])
		});

		AsyncStorage.multiGet([ 'token','latitude', 'longitude']).then((data) => {
			let token = data[0][1];
			let latitude = data[1][1];
			let longitude = data[2][1];
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/friends?token=' + token)
				.then((response) => response.json())
				.then(async (responseJson) => {
					this.setState({
						recommendationsList: responseJson,
						isLoading: false,
					})
					console.log('rec',this.state.recommendationsList);
				})
				.catch((error) => {
					console.error(error); });
		});
}


	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}

	_renderContent() {
		if (this.state.isLoading) {
			return (
				<View style={styles.scrollViewContent}>
					<ActivityIndicator/>
				</View>
			);
		}
		return (
			<Tabs initialPage={0}>
				<Tab
					heading="Друзья">
					<FriendsTab recommendationsList={this.state.recommendationsList}/>
				</Tab>

				<Tab
					heading="Сообщества">
					<CommunitiesTab/>
				</Tab>
			</Tabs>
		);

	}

	render() {
		console.log('!!',this.state.recommendationsList);
		return (
			<Container>
				<AppHeader title={'Рекомендации'}/>
				{this._renderContent()}
			</Container>
		);
	}
}


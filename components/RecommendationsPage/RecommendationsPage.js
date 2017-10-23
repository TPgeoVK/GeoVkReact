import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, AsyncStorage} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import AppHeader from '../Header/Header'
import Friends from './FriendsTab';
import Communities from './CommunitiesTab';




export default class RecommendationsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			recomendationsList: [],
		};
	}
	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
				let lat = parseFloat(position.coords.latitude);
				let long = parseFloat(position.coords.longitude);

				console.log('coordinates:',lat,long )
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
			console.log('coordinates22:',lat,long )
			AsyncStorage.multiSet([
				["latitude", lat.toString()],
				["longitude", long.toString()]
			])
		});

		AsyncStorage.multiGet([ 'token','latitude', 'longitude']).then((data) => {
			let token = data[0][1];
			let latitude = data[1][1];
			let longitude = data[2][1];
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/event/byFriends?token=' + token + '&latitude=' + latitude + '&longitude=' + longitude)
				.then((response) => response.json())
				.then(async (responseJson) => {
					this.setState({
						recomendationsList: responseJson,
						isLoading: false,
					})
					console.log('rec',this.state.recomendationsList);
				})
				.catch((error) => {
					console.error(error); });
		});
}


	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	render() {
		return (
			<Container>
				<AppHeader title={'Recommendations'}/>
				<Tabs initialPage={0}>
					<Tab
						heading="Друзья">
						<Friends coordinates={this.state.initialPosition}/>
					</Tab>

					<Tab
						heading="Сообщества">
						<Communities coordinates={this.state.initialPosition}/>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}


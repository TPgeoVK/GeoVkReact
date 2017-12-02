import React, {Component} from 'react';
import {Container, StyleProvider} from 'native-base';
import {AsyncStorage} from 'react-native';
import LoginNavigator from './navigators/loginNavigator'
import Root from './navigators/appNavigator'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isReady: false,
			isValidToken: false
		};
	}

	componentDidMount() {
		// navigator.geolocation.getCurrentPosition((position) => {
		// 		let lat = parseFloat(position.coords.latitude);
		// 		let long = parseFloat(position.coords.longitude);
		// 		AsyncStorage.multiSet([
		// 			["latitude", lat],
		// 			["longitude", long]
		// 		])
		// 	},
		// 	(error) => {
		// 		console.log(error)
		// 	},
		// )


		// this.watchID = navigator.geolocation.watchPosition((position) => {
		// 	let lat = parseFloat(position.coords.latitude);
		// 	let long = parseFloat(position.coords.longitude);
		// 	AsyncStorage.multiSet([
		// 		["latitude", lat],
		// 		["longitude", long]
		// 	])
		// });

		//AsyncStorage.multiRemove(['recommendationsListFriends', 'recommendationsListGroups', 'user', 'checkinsList']);


		// AsyncStorage.multiGet([ 'token','latitude', 'longitude']).then((data) => {
		// 	let token = data[0][1];
		// 	let latitude = data[1][1];
		// 	let longitude = data[2][1];
		// 	fetch('http://tp2017.park.bmstu.cloud/tpgeovk/trigger?token=' + token + '&latitude' + latitude + '&longitude' + longitude)
		// 		.then((response) => response.json())
		// 		.catch((error) => {
		// 			console.error(error); });
		// });
	}


	async componentWillMount() {
		const token = await AsyncStorage.getItem('token');
		if (token !== null) {
			console.log('check token to bmstu:', token);
			await fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/user?token=' + token)
				.then((response) => response.json())
				.then((responseJson) => {
					if (!responseJson['error']) {
						this.setState({isValidToken: true});

						AsyncStorage.getItem('token', (err, result) => {
							fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/user?token=' + result)
								.then((response) => response.json())
								.then( (responseJson) => {
									AsyncStorage.setItem('user', JSON.stringify(this.state.user));
								})
								.catch((error) => {
									console.error(error);
								});

							fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/all?token=' + result)
								.then((response) => response.json())
								.then( (responseJson) => {
									AsyncStorage.setItem('checkinsList', JSON.stringify(this.state.checkinsList));
								})
								.catch((error) => {
									console.error(error);
								});

							fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/friends?token=' + result)
								.then((response) => response.json())
								.then((responseJson) => {
									AsyncStorage.setItem('recommendationsListFriends', JSON.stringify(this.state.recommendationsListFriends));
								})
								.catch((error) => {
									console.error(error);
								});
							fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/groups?token=' + token)
								.then((response) => response.json())
								.then((responseJson) => {
									AsyncStorage.setItem('recommendationsListGroups', JSON.stringify(this.state.recommendationsListGroups));
								})
								.catch((error) => {
									console.error(error);
								});

						});



					}
					console.log('token valid!');
				})
				.catch((error) => {
					console.error(error);
				});
		}

		this.setState({isReady: true});
	}


	render() {
		console.log('validtoken?:', this.state.isValidToken);
		if (this.state.isValidToken) {
			return (
				<StyleProvider style={getTheme(platform)}>
					<Container>
						<Root/>
					</Container>

				</StyleProvider>
			);
		}
		return (
			<StyleProvider style={getTheme(platform)}>
				<Container>
					<LoginNavigator/>
				</Container>

			</StyleProvider>
		);
	}
}

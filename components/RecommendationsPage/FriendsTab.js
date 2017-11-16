import React, {Component} from 'react';
import {
	Image,
	Animated,
	Platform,
	StatusBar,
	StyleSheet,
	View,
	RefreshControl,
	AsyncStorage,
	ActivityIndicator
} from 'react-native';
import RecommendationsCardListFriends from './RecommendationsCardListFriends'

export default class FriendsTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			recommendationsListFriends: [],
			isLoadingFriends: true,
			refreshing: false,
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
			(error) => {
				console.log(error)
			},
		);

		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			AsyncStorage.multiSet([
				["latitude", lat.toString()],
				["longitude", long.toString()]
			])
		});

		AsyncStorage.getItem('recommendationsListFriends').then((item) => {
			console.log('из памяти друзья', JSON.parse(item))
			if (JSON.parse(item) === null) {
				AsyncStorage.multiGet(['token', 'latitude', 'longitude']).then((data) => {
					let token = data[0][1];
					let latitude = data[1][1];
					let longitude = data[2][1];
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/friends?token=' + token)
						.then((response) => response.json())
						.then(async (responseJson) => {
							this.setState({
								recommendationsListFriends: responseJson,
								isLoadingFriends: false,
							})
							AsyncStorage.setItem('recommendationsListFriends', JSON.stringify(this.state.recommendationsListFriends));
							console.log('скачали и положили', responseJson)
						})
						.catch((error) => {
							console.error(error);
						});
				});
			} else {
				this.setState({
					recommendationsListFriends: JSON.parse(item),
					isLoadingFriends: false,
				})
			}


		});

	}

	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	_onRefresh() {
		this.setState({refreshing: true});
		console.log('чистим')
		AsyncStorage.removeItem('recommendationsListFriends');
		AsyncStorage.multiGet(['token', 'latitude', 'longitude']).then((data) => {
			let token = data[0][1];
			let latitude = data[1][1];
			let longitude = data[2][1];
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/friends?token=' + token)
				.then((response) => response.json())
				.then(async (responseJson) => {
					this.setState({
						recommendationsListFriends: responseJson,
						isLoadingFriends: false,
					})
					AsyncStorage.setItem('recommendationsListFriends', JSON.stringify(this.state.recommendationsListFriends));
					console.log('скачали и положили', responseJson)
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

	_renderScrollViewContent() {
		const data = Array.from({length: 30});
		return (
			<View style={styles.scrollViewContent}>
				<RecommendationsCardListFriends recommendations={this.state.recommendationsListFriends}/>
			</View>
		);
	}

	render() {
		if (this.state.isLoadingFriends) {
			return (
				<View style={styles.scrollViewContent}>
					<ActivityIndicator size={70} color={'#3d5f86'} style={styles.activityIndicator}/>
				</View>
			);
		}
		return (

			<Animated.ScrollView
				style={styles.fill}
				scrollEventThrottle={1}
				onScroll={Animated.event(
					[{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
					{useNativeDriver: true},
				)}
				refreshControl={
					<RefreshControl
						tintColor='#3d5f86'
						colors={['#3d5f86']}
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh.bind(this)}/>}
			>
				{this._renderScrollViewContent()}
			</Animated.ScrollView>
		);
	}
}


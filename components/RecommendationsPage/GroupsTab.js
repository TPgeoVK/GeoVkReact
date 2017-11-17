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
import RecommendationsCardListGroups from './RecommendationsCardListGroups'


export default class GroupsTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			recommendationsListGroups: [],
			isLoadingGroups: true,
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

		AsyncStorage.getItem('recommendationsListGroups').then((item) => {
			if (JSON.parse(item) === null) {
				AsyncStorage.multiGet(['token', 'latitude', 'longitude']).then((data) => {
					let token = data[0][1];
					let latitude = data[1][1];
					let longitude = data[2][1];
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/groups?token=' + token)
						.then((response) => response.json())
						.then((responseJson) => {
							this.setState({
								recommendationsListGroups: responseJson,
								isLoadingGroups: false,
							})
							AsyncStorage.setItem('recommendationsListGroups', JSON.stringify(this.state.recommendationsListGroups));

						})
						.catch((error) => {
							console.error(error);
						});
				});
			} else {
				this.setState({
					recommendationsListGroups: JSON.parse(item),
					isLoadingGroups: false,
				})
			}


		});

	}

	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	_onRefresh() {
		this.setState({refreshing: true});
		AsyncStorage.removeItem('recommendationsListGroups');
		AsyncStorage.multiGet(['token', 'latitude', 'longitude']).then((data) => {
			let token = data[0][1];
			let latitude = data[1][1];
			let longitude = data[2][1];
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/recommend/groups?token=' + token)
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState({
						recommendationsListGroups: responseJson,
						isLoadingGroups: false,
					})
					AsyncStorage.setItem('recommendationsListGroups', JSON.stringify(this.state.recommendationsListGroups));

				}).then(() => {
					this.setState({refreshing: false});
				}
			)
				.catch((error) => {
					console.error(error);
				});
		})

	}


	render() {
		if (this.state.isLoadingGroups) {
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

					<RecommendationsCardListGroups recommendations={this.state.recommendationsListGroups}/>

			</Animated.ScrollView>
		);
	}


}


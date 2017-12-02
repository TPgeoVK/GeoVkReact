import React, {Component} from 'react';
import {
	Image,
	Animated,
	Platform,
	StatusBar,
	StyleSheet,
	View,
	AsyncStorage,
	ActivityIndicator,
	Text, RefreshControl,
	Alert
} from 'react-native';
import {Fab} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckinCardList from './CheckinCardList';
import styles from './styleCheckinsPage';
import * as consts from './constantsCheckinsPage';


export default class CheckinsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollY: new Animated.Value(0),
			isLoading: true,
			isLoadingUser: true,
			checkinsList: [],
			user: [],
			refreshing: false,
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('checkinsList').then((item) => {
			console.log('checkinsList', JSON.parse(item))
			if (JSON.parse(item) === null) {
				AsyncStorage.getItem('token', (err, result) => {
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/all?token=' + result)
						.then((response) => response.json())
						.then( (responseJson) => {
							this.setState({
								checkinsList: responseJson,
								isLoading: false,
							});
							AsyncStorage.setItem('checkinsList', JSON.stringify(this.state.checkinsList));
						})
						.catch((error) => {
							console.error(error);
						});
				});
			} else {
				this.setState({
					checkinsList: JSON.parse(item),
					isLoading: false,
				})
			}

		});
		AsyncStorage.getItem('user').then((item) => {
			if (JSON.parse(item) === null) {
				AsyncStorage.getItem('token', (err, result) => {
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/user?token=' + result)
						.then((response) => response.json())
						.then( (responseJson) => {
							this.setState({
								user: responseJson,
								isLoadingUser: false,
							});
							AsyncStorage.setItem('user', JSON.stringify(this.state.user));
						})
						.catch((error) => {
							console.error(error);
						});
				});
			} else {
				this.setState({
					user: JSON.parse(item),
					isLoadingUser: false,
				})
			}
		});

		navigator.geolocation.getCurrentPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			AsyncStorage.multiSet([
				["latitude", lat.toString()],
				["longitude", long.toString()]
			])


			AsyncStorage.multiGet(['token']).then((data) => {
				let token = data[0][1];

				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/location/detectPlace', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token,
						latitude: lat,
						longitude: long,
						text: 'mail.ru',
					})
				}).then((response) => response.json())
					.then(async (responseJson) => {
						if (responseJson.title)
							Alert.alert(
								'Зачикиньтесь!',
								'Вы сейчас в '+ responseJson.title +'?',
								[
									{text: 'Check in!', onPress: () => this.props.navigation.navigate('NewPost')},
									{text: 'Да', onPress: () => console.log('Yes Pressed')},
									{text: 'Нет', onPress: () => console.log('No Pressed'), style: 'cancel'},
								],
								{ cancelable: false }
							)
					})
					.catch((error) => {
						console.error(error);
					});

			});

				},
				(error) => {
					console.log(error)
				},
			)

	}

	async _onRefresh() {
		this.setState({refreshing: true});
		AsyncStorage.removeItem('user');
		AsyncStorage.removeItem('checkinsList');
		await AsyncStorage.getItem('token', (err, result) => {
		 fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/all?token=' + result)
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState({
						checkinsList: responseJson,
						isLoading: false,
					});
					AsyncStorage.setItem('checkinsList', JSON.stringify(this.state.checkinsList));
				})
				.catch((error) => {
					console.error(error);
				});

			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/user?token=' + result)
				.then((response) => response.json())
				.then((responseJson) => {
					this.setState({
						user: responseJson,
						isLoadingUser: false,
					});
					AsyncStorage.setItem('user', JSON.stringify(this.state.user));
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

		if ((this.state.isLoadingFriends && this.state.isLoadingUser) && ('error' in this.state.checkinsList)) {
			return (
				<View style={styles.scrollViewContent}>
					<ActivityIndicator size={70} color={'#3d5f86'} style={styles.activityIndicator}/>
				</View>
			);
		}
		return (
			<View style={styles.scrollViewContent}>
				<CheckinCardList checkinsList={this.state.checkinsList}/>
			</View>
		);

	}

	render() {
		const headerTranslate = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [0, -consts.HEADER_SCROLL_DISTANCE],
			extrapolate: 'clamp',
		});

		const titleScale = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE / 2, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 0.85],
			extrapolate: 'clamp',
		});
		const titleTranslate = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE / 2, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [0, 0, -8],
			extrapolate: 'clamp',
		});

		console.log();
		return (

			<View style={styles.fill}>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
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
							onRefresh={this._onRefresh.bind(this)}
						/>
					}
				>
					{this._renderScrollViewContent()}
				</Animated.ScrollView>
				<Animated.View
					style={[
						styles.header,
						{transform: [{translateY: headerTranslate}]},
						{justifyContent: 'center', alignItems: 'center',}
					]}>

					<Image style={styles.circle}
					       source={{uri: this.state.user.photo200}}/>

				</Animated.View>
				<Animated.View
					style={[
						styles.bar,
						{
							transform: [
								{scale: titleScale},
								{translateY: headerTranslate},
							],
						},
					]}>
					<Text style={styles.title}>{this.state.user.firstName} {this.state.user.lastName}</Text>
				</Animated.View>
				<Fab
					active={this.state.active}
					direction="up"
					containerStyle={{}}
					style={styles.fab}
					position="bottomRight">
					<Icon style={styles.fabIcon} name="create"
					      onPress={() => {
						      this.props.navigation.navigate('NewPost')
					      }}/>
				</Fab>
			</View>
		);


	}
}
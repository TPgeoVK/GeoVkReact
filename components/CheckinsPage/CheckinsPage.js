import React, {Component} from 'react';
import {Image, Animated, Platform, StatusBar, StyleSheet, View, AsyncStorage, ActivityIndicator} from 'react-native';
import {Fab, Text, Icon} from 'native-base';
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
			user:[],
		};
	}

	componentDidMount() {
		AsyncStorage.getItem('token', (err, result) => {
			console.log('token from storage (for request):', result);
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/all?token=' + result)
				.then((response) => response.json())
				.then(async (responseJson) => {
					// await AsyncStorage.setItem('checkinsList', responseJson);
					this.setState({
						checkinsList: responseJson,
						isLoading: false,
					})
				})
				.catch((error) => {
					console.error(error);
				});
		});

		AsyncStorage.getItem('token', (err, result) => {
			console.log('token from storage (for request):', result);
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/user?token=' + result)
				.then((response) => response.json())
				.then(async (responseJson) => {
					// await AsyncStorage.setItem('checkinsList', responseJson);
					this.setState({
						user: responseJson,
						isLoadingUser: false,
					})
					// console.log('user', this.state.user)
				})
				.catch((error) => {
					console.error(error);
				});
		});
	}


	_renderScrollViewContent() {
		// console.log('try to prop checkins');
		// console.log(this.state.checkinsList);
		if (this.state.isLoading && this.state.isLoadingUser) {
			return (
				<View style={styles.scrollViewContent}>
					<ActivityIndicator/>
				</View>
			);
		}
		return (
			<View style={styles.scrollViewContent}>
				<CheckinCardList checkins={this.state.checkinsList}/>
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
			outputRange: [1, 1, 0.8],
			extrapolate: 'clamp',
		});
		const titleTranslate = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE / 2, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [0, 0, -8],
			extrapolate: 'clamp',
		});

		return (
			<View style={styles.fill}>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="rgba(0, 0, 255, 0.9)"/>
				<Animated.ScrollView
					style={styles.fill}
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
						{useNativeDriver: true},
					)}>
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
								{translateY: titleTranslate},
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
					<Icon style={styles.icon} name="create"
					      onPress={() => {
						      this.props.navigation.navigate('NewPost')
					      }}/>
				</Fab>
			</View>
		);


	}
}


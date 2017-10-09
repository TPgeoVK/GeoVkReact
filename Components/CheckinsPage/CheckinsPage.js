import React, {Component} from 'react';
import {Image, Animated, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import {Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body} from 'native-base';
import CheckinCardList from './CheckinCardList';
import styles from  './styleCheckinsPage';
import * as consts from './constantsCheckinsPage'

export default class CheckinsPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
		};
	}

	_renderScrollViewContent() {
		const data = Array.from({length: 30});
		return (
			<View style={styles.scrollViewContent}>
				<CheckinCardList/>
			</View>
		);
	}

	render() {
		const headerTranslate = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [0, -consts.HEADER_SCROLL_DISTANCE],
			extrapolate: 'clamp',
		});

		const imageOpacity = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE / 2, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [1, 1, 0],
			extrapolate: 'clamp',
		});
		const imageTranslate = this.state.scrollY.interpolate({
			inputRange: [0, consts.HEADER_SCROLL_DISTANCE],
			outputRange: [0, 100],
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
					backgroundColor="rgba(0, 0, 255, 0.9)"
				/>
				<Animated.ScrollView
					style={styles.fill}
					scrollEventThrottle={1}
					onScroll={Animated.event(
						[{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
						{useNativeDriver: true},
					)}
				>
					{this._renderScrollViewContent()}
				</Animated.ScrollView>
				<Animated.View
					style={[
						styles.header,
						{transform: [{translateY: headerTranslate}]},
						{justifyContent: 'center', alignItems: 'center',}
					]}
				>

					<Image style={styles.circle} source={{uri: 'http://glamsquadmagazine.com/wp-content/uploads/2017/04/julia_roberts.jpg'}}
					/>

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
					]}
				>
					<Text style={styles.title}>Julia Roberts</Text>
				</Animated.View>
			</View>
		);
	}
}


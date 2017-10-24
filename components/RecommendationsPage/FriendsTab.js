import React, {Component} from 'react';
import {Image, Animated, Platform, StatusBar, StyleSheet, View,} from 'react-native';
import RecommendationsCardList from './RecommendationsCardList'

export default class FriendsTab extends Component {
	constructor(props) {
		super(props);

		this.state = {
			scrollY: new Animated.Value(0),
			recommendationsList: this.props.recommendationsList,
		};

		console.log(this.props)

	}

	_renderScrollViewContent() {
		const data = Array.from({length: 30});
		return (
			<View style={styles.scrollViewContent}>
				<RecommendationsCardList recommendations={this.state.recommendationsList}/>
			</View>
		);
	}

	render() {

		return (

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
		);
	}
}


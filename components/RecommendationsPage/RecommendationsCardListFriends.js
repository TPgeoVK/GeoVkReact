import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content, Text} from 'native-base';
import RecommendationsCardFriends from './RecommendationsCardFriends'

export default class RecommendationsCardListFriends extends Component {
	constructor(props) {
		super(props);
	}


	render() {
		if (this.props.recommendations === []) {
			return (
				<Content>
					<Text>Нам нечего Вам порекомендовать</Text>
				</Content>
			);
		}
		return (
			<Content>
				{this.props.recommendations.map(recommendation => (
					<RecommendationsCardFriends key={recommendation.id} recommendation={recommendation}/>))}
			</Content>
		);
	}
}
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content,Text} from 'native-base';
import RecommendationsCardFriends from './RecommendationsCardFriends'

export default class RecommendationsCardListFriends extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recommendations: this.props.recommendations,
		};
		console.log(this.props)
	}


	render() {
		console.log(this.state.recommendations)
		if (this.state.recommendations === []) {
			return (
				<Content>
					<Text>Нам нечего Вам порекомендовать</Text>
				</Content>
			);
		}
		return (
			<Content>
				{this.state.recommendations.map(recommendation => (<RecommendationsCardFriends key={recommendation.id} recommendation={recommendation}/>))}
			</Content>
		);
	}
}
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content, Text} from 'native-base';
import RecommendationsCardGroups from './RecommendationsCardGroups'

export default class RecommendationsCardListGroups extends Component {
	constructor(props) {
		super(props);

	}


	render() {
		console.log(this.props.recommendations)
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
					<RecommendationsCardGroups key={recommendation.id} recommendation={recommendation}/>))}
			</Content>
		);
	}
}
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content,Text} from 'native-base';
import RecommendationsCardGroups from './RecommendationsCardGroups'

export default class RecommendationsCardListGroups extends Component {
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
				{this.state.recommendations.map(recommendation => (<RecommendationsCardGroups key={recommendation.id} recommendation={recommendation}/>))}
			</Content>
		);
	}
}
import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content} from 'native-base';
import RecommendationsCard from './RecommendationsCard'

export default class RecommendationsCardList extends Component {
	render() {
		console.log()
		return (
			<Content>
				<RecommendationsCard />
				<RecommendationsCard />
				<RecommendationsCard />
				<RecommendationsCard />
				<RecommendationsCard />
				<RecommendationsCard />
				<RecommendationsCard />
			</Content>
		);
	}
}
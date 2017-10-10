import React, { Component } from 'react';
import { Image,View } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Fab } from 'native-base';
import RecommendationsCard from './RecommendationsCard'

export default class RecommendationsCardList extends Component {
	render() {
		return (
			<Content style={{}}>
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
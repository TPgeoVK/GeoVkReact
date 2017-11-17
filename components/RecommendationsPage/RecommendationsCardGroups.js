import React, {Component} from 'react';
import {Image, View, Linking} from 'react-native';
import styles from './styleRecommendationsPage'
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';

export default class RecommendationsCardGroups extends Component {

	render() {
		const recommendation = this.props.recommendation;

		return (
			<Card style={styles.card}>
				<CardItem>
					<Left>
						<Thumbnail source={{uri: recommendation.photo200}}/>
						<Body>
						<Text style={styles.text}>{recommendation.name}</Text>
						<Text note style={styles.textNote}>{recommendation.membersCount} участников</Text>
						</Body>
					</Left>
					<Right>

						<Button style={styles.button}
						        onPress={() => {
							        Linking.openURL(`https://vk.com/club${recommendation.id}`)
						        }}>
							<Text style={styles.textButton}>Подписаться</Text>
						</Button>
					</Right>
				</CardItem>

			</Card>
		)
	}
}


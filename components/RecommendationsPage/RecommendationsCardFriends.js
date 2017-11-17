import React, {Component} from 'react';
import {Image, View, Linking} from 'react-native';
import styles from './styleRecommendationsPage'
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';

export default class RecommendationsCardFriends extends Component {

	render() {
		const recommendation = this.props.recommendation;

		const name = `${recommendation.firstName} ${recommendation.lastName}`;
		return (
			<Card style={styles.card}>
				<CardItem>
					<Left>
						<Thumbnail source={{uri: recommendation.photo200}}/>
						<Body>
						<Text style={styles.text}>{name}</Text>
						<Text note style={styles.textNote}>{recommendation.occupation}</Text>
						</Body>
					</Left>
					<Right>

						<Button style={styles.button}
						        onPress={() => {
							        Linking.openURL(`https://vk.com/id${recommendation.id}`)
						        }}>
							<Text style={styles.textButton}>Добавить в друзья</Text>
						</Button>
					</Right>
				</CardItem>

			</Card>
		)
	}
}


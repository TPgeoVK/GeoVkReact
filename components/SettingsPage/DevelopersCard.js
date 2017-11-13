import React, {Component} from 'react';
import {Image, View, Linking} from 'react-native';
import styles from './styleSettingsPage'
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';

export default class DevelopersCard extends Component {

	render() {
		const developer = this.props.developer;

		const name = `${developer.firstName} ${developer.lastName}`;
		return (
			<Card style={styles.card}>
				<CardItem>
					<Left>
						<Thumbnail source={{uri: developer.photo200}}/>
						<Body>
						<Text style={styles.text}>{name}</Text>
						<Text note style={styles.textNote}>{developer.occupation}</Text>
						</Body>
					</Left>
					<Right>

						<Button style={styles.button}
						        onPress={() => {Linking.openURL(`https://vk.com/id${developer.id}`)}}>
							<Text style={styles.textButton}>Добавить в друзья</Text>
						</Button>
					</Right>
				</CardItem>

			</Card>
		)
	}
}


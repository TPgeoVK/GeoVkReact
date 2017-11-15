import React, {Component} from 'react';
import {Image, View, Linking} from 'react-native';
import styles from './styleSettingsPage'
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';

export default class DevelopersCard extends Component {

	render() {
		const developer = this.props.developer;

		const name = `${developer.firstName} ${developer.lastName}`;
		let photo;
		if (developer.photo200 === null) {
			photo = 'https://vk.com/images/deactivated_200.png'
		} else {
			photo = developer.photo200;
		}

		return (
				<CardItem>
					<Left>
						<Thumbnail source={{uri: photo}}/>
						<Body>
						<Text style={styles.text}>{name}</Text>
						</Body>
					</Left>
					<Right>

						<Button style={styles.button}
						        onPress={() => {Linking.openURL(`https://vk.com/id${developer.id}`)}}>
							<Text style={styles.textButton}>Добавить в друзья</Text>
						</Button>
					</Right>
				</CardItem>

		)
	}
}


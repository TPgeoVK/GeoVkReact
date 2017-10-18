import React, {Component} from 'react';
import {Image, View} from 'react-native';
import styles from './styleRecommendationsPage'
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';

export default class RecommendationsCard extends Component {

	render() {
		return (
			<Card style={styles.card}>
				<CardItem>
					<Left>
						<Thumbnail source={{uri: 'https://pp.userapi.com/c636330/v636330551/38cc3/A4VRX9JT9DA.jpg'}}/>
						<Body>
						<Text style={styles.text}>Зерминова Евфросиния</Text>
						<Text note style={styles.textNote}>МГТУ им. Баумана</Text>
						</Body>
					</Left>
					<Right>
						<Button style={styles.button}>
							<Text style={styles.textButton}>Добавить в друзья</Text>
						</Button>
					</Right>
				</CardItem>

			</Card>
		)
	}
}


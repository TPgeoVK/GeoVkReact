import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Card, CardItem, Text, Button, Body} from 'native-base';
import styles from './styleRecommendationsPage'


export default class RecommendationsCard extends Component {

	render() {
		return (
			<Card>
				<CardItem cardBody>
					<Image source={{uri: 'http://glamsquadmagazine.com/wp-content/uploads/2017/04/julia_roberts.jpg'}}
					       style={styles.image}/>
				</CardItem>
				<CardItem>
					<Body>
					<Button>
						<Text>Add friend</Text>
					</Button>
					</Body>
				</CardItem>
			</Card>
		)
	}
}


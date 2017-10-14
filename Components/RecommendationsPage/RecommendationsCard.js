import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Card, CardItem, Text, Button, Body} from 'native-base';


export default class RecommendationsCard extends Component {

	render() {
		return (
			<Card style={{}}>
				<CardItem cardBody>
					<Image source={{uri: 'http://glamsquadmagazine.com/wp-content/uploads/2017/04/julia_roberts.jpg'}}
					       style={{height: 100, width: null, flex: 1}}/>
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


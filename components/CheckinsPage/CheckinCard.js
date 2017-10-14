import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';
import styles from './styleCard'
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class CheckinCard extends Component {
	render() {
		return (
			<Card style={styles.card}>

				<CardItem >
					<Left>
						<Thumbnail
							source={{uri: 'http://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/SanFrancisco_0.jpg'}}/>
						<Body>
						<Text>Brighton Beach</Text>
						<Text note>April 15, 2016</Text>
						</Body>
					</Left>
				</CardItem>

				<CardItem>
					<Body>
					<Text>
						Brighton Beach is an oceanside neighborhood in the southern portion of the New York City borough
						of Brooklyn, along the Coney Island peninsula.
					</Text>
					</Body>
				</CardItem>

				<View style={styles.footer}>
					<CardItem style={styles.footerItem}>
						<Left>
							<Button transparent>
								<Icon name="favorite-border" style={styles.icon}/>
								<Text style={styles.text}>1,925</Text>
							</Button>
						</Left>
						<Right>
							<Button transparent>
								<Icon name="share" style={styles.icon}/>
								<Text style={styles.text}>1,925</Text>
							</Button>
						</Right>
					</CardItem>
				</View>
			</Card>
		)
	}
}
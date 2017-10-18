import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Card, CardItem, Thumbnail, Text, Button, Left, Body, Right} from 'native-base';
import styles from './styleCard'
import Icon from 'react-native-vector-icons/MaterialIcons';



export default class CheckinCard extends Component {
	render() {
		const checkin = this.props.checkin;
		const date = new Date(parseInt(checkin.date)*1000);
		return (
			<Card style={styles.card}>

				<CardItem>
					<Left>

						{/*<Thumbnail*/}
							{/*source={{uri: checkin.place.placeIcon}}/>*/}
						<Body>
						<Text>{checkin.place.title}</Text>
						<Text note>{date.getDate()} {date.toLocaleString("en-us", { month: "short" })} {date.getFullYear()}</Text>
						</Body>
					</Left>
				</CardItem>

				<CardItem>
					<Body>
					<Text>
						{checkin.text}
					</Text>
					</Body>
				</CardItem>

				<View style={styles.footer}>
					<CardItem style={styles.footerItem}>
						<Left>
							<Button transparent>
								<Icon name="favorite-border" style={styles.icon}/>
								<Text style={styles.text}>{checkin.likes}</Text>
							</Button>
						</Left>

						<Right>
							<Button transparent>
								<Icon name="share" style={styles.icon}/>
								<Text style={styles.text}>{checkin.reposts}</Text>
							</Button>
						</Right>
					</CardItem>
				</View>
			</Card>
		)
	}
}
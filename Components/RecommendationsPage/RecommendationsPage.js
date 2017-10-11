import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import {Container, Content, Button, Text, Tab, Tabs} from 'native-base';
import AppHeader from '../Header/Header'
import styles from './styleRecommendationsPage'
import Friends from './FriendsTab';
import Communities from './CommunitiesTab';
export default class LoginPage extends Component {
	render() {
		return (
			<Container>
				<AppHeader/>
				<Tabs initialPage={1}>
					<Tab
					     heading="Friends">
						<Friends />
					</Tab>
					<Tab
					     heading="Communities">
						<Communities />
					</Tab>
				</Tabs>
			</Container>
		);
	}
}


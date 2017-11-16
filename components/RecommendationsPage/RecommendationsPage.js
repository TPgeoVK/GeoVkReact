import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, AsyncStorage, StatusBar, ActivityIndicator} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import AppHeader from '../Header/Header'
import FriendsTab from './FriendsTab';
import GroupsTab from './GroupsTab';
import styles from './styleRecommendationsPage'


export default class RecommendationsPage extends Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<Container>
				<StatusBar
					translucent
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
				<AppHeader title={'Рекомендации'}/>
				<Tabs initialPage={0}>
					<Tab heading="Люди">
						<FriendsTab/>
					</Tab>

					<Tab heading="Сообщества">
						<GroupsTab/>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}


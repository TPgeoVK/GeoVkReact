import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import {Container, Tab, Tabs} from 'native-base';
import AppHeader from '../Header/Header'
import Friends from './FriendsTab';
import Communities from './CommunitiesTab';

export default class RecommendationsPage extends Component {
	render() {
		return (
			<Container>
				<AppHeader title={'Recommendations'}/>
				<Tabs initialPage={0}>
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


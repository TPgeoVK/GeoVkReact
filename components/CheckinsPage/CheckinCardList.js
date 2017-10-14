import React, {Component} from 'react';
import {Image} from 'react-native';
import {Content} from 'native-base';
import CheckinCard from './CheckinCard'

export default class CheckinCardList extends Component {
	render() {
		return (
			<Content>
				<CheckinCard />
				<CheckinCard />
				<CheckinCard />
				<CheckinCard />
				<CheckinCard />
				<CheckinCard />
				<CheckinCard />
			</Content>
		);
	}
}
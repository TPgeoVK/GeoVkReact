import React, {Component} from 'react';
import {Image} from 'react-native';
import {Content} from 'native-base';
import CheckinCard from './CheckinCard'

export default class CheckinCardList extends Component {
	render() {
		const checkins = this.props.checkins;
		console.log('CheckinCardList', checkins)
		return (
			<Content>
				{checkins.map(checkin => (<CheckinCard key={checkin.checkinId} checkin={checkin}/>))}
				{/*<CheckinCard checkin={checkins[1]}/>*/}
			</Content>
		);
	}
}


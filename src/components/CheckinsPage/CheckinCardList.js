import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {Content} from 'native-base';
import CheckinCard from './CheckinCard'

export default class CheckinCardList extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const checkins = this.props.checkinsList
//TODO
		if (checkins === []) {
			return (
				<Content>
					<Text>Вы пока нигде не отметелись(((</Text>
				</Content>
			);
		}
		return (
			<Content>
				{checkins.map(checkin => (<CheckinCard key={checkin.checkinId} checkin={checkin}/>))}
				{/*<CheckinCard checkin={this.state.checkins[1]}/>*/}
			</Content>
		);
	}
}


import React, {Component} from 'react';
import {Image, Text} from 'react-native';
import {Content} from 'native-base';
import CheckinCard from './CheckinCard'

export default class CheckinCardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checkins: this.props.checkins,
		};
		console.log(this.props)
	}
	render() {

//TODO
		console.log(this.state.checkins)
		if ('list',this.state.checkins === []) {
			return (
				<Content>
					<Text>Вы пока нигде не отметелись(((</Text>
				</Content>
			);
		}
		return (
			<Content>
				{this.state.checkins.map(checkin => (<CheckinCard key={checkin.checkinId} checkin={checkin}/>))}
				{/*<CheckinCard checkin={this.state.checkins[1]}/>*/}
			</Content>
		);
	}
}


import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Content,Text} from 'native-base';
import DevelopersCard from './DevelopersCard'

export default class DevelopersCardList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			developers:this.props.developers,
		};
	}


	render() {

		return (
			<Content>
				{this.state.developers.map(developer => (<DevelopersCard key={developer.id} developer={developer}/>))}
			</Content>
		);
	}
}
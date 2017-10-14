import React, {Component} from 'react';
import {Container, Header, Left, Body, Right, Title} from 'native-base';
import styles from './styleHeader';
export default class AppHeader extends Component {
	render() {
		return (
			<Header>
				<Body>
					<Title style={styles.text}>{this.props.title}</Title>
				</Body>
			</Header>
		);
	}
}
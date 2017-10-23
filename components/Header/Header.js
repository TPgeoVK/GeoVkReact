import React, {Component} from 'react';
import {Header, Body, Title} from 'native-base';
import styles from './styleHeader';
export default class AppHeader extends Component {
	render() {
		return (
			<Header style={styles.header}>
				<Body>
				<Title style={styles.text}>{this.props.title}</Title>
				</Body>
			</Header>
		);
	}
}
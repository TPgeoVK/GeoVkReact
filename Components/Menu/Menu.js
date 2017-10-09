import React, { Component } from 'react';
import { Container, Header, Content, Footer, FooterTab, Button, Text } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styleMenu'

export default class Menu extends Component {
	render() {
		return (
				<Footer style={styles.footer}>
					<FooterTab style={styles.footerTab}>
						<Button vertical>
							<Icon style={styles.icon} name="map" />
						</Button>
						<Button vertical>
							<Icon style={styles.icon} name="account-circle" />
						</Button>
						<Button vertical>
							<Icon style={styles.icon} active name="search" />
						</Button>

					</FooterTab>
				</Footer>
		);
	}
}
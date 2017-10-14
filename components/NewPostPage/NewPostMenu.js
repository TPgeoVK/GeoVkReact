import React, {Component} from 'react';
import {Footer, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styleNewPostMenu'


export default class NewPostMenu extends Component {
	render() {
		return (
			<Footer style={styles.footer}>
				<FooterTab style={styles.footerTab}>
					<Button vertical
					        onPress={() => {
						        this.props.navigation.goBack()
					        }}>
						<Icon style={styles.icon} name="clear"/>
					</Button>
					<Button vertical>
						<Icon style={styles.icon} name="location-on"/>
					</Button>
					<Button vertical>
						<Icon style={styles.icon} active name="done"/>
					</Button>

				</FooterTab>
			</Footer>
		);
	}
}
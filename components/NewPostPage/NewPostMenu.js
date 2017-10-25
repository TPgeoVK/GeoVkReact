import React, {Component} from 'react';
import {Footer, FooterTab, Button} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styleNewPostMenu'
import {AsyncStorage} from 'react-native';



export default class NewPostMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
	}

	_onPress = async() => {

		console.log('text', this.props.text);
		console.log('placeid', this.props.place.id);
		AsyncStorage.getItem('token', (err, result) => {
			//TODO
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/post/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: result,
					text: this.props.text,
					placeId: this.props.place.id,
				})
			}).then((response) => response.json())
				.then(async (responseJson) => {
					console.log('post', responseJson)
				})
				.catch((error) => {
					console.error(error); });

		});
		this.props.navigation.goBack();
		//TODO
	}

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
					{/*<Button vertical>*/}
						{/*<Icon style={styles.icon} name="location-on"/>*/}
					{/*</Button>*/}
					<Button vertical
					        onPress={() => {
						        this._onPress()
					        }}>
						<Icon style={styles.icon} active name="done"/>
					</Button>

				</FooterTab>
			</Footer>
		);
	}
}
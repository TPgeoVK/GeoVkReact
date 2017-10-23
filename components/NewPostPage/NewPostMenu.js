import React, {Component} from 'react';
import {Footer, FooterTab, Button, AsyncStorage} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styleNewPostMenu'


export default class NewPostMenu extends Component {
	_onPress = async(text) => {
		this.setState({text});
		console.log('text', text);
		AsyncStorage.multiGet([ 'token','postText', 'place']).then((data) => {
			let token = data[0][1];
			let text = data[1][1];
			let place = data[2][1];

			//TODO
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/location/detectPlace', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: token,
					text: text,
					place: place,
				})
			})
				// .then((response) => response.json())
				// .then(async (responseJson) => {
				// 	this.setState({
				// 		place: responseJson,
				// 		isLoading: false,
				// 	});
				// 	console.log('place', this.state.place)
				// 	console.log('text', this.state.text)
				// })
				// .catch((error) => {
				// 	console.error(error); });

		});
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
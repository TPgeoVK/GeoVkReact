import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
export default class LoginView extends Component {
	render () {
		return(
			<WebView
				source={{uri: 'http://tp2017.park.bmstu.cloud/tpgeovk/auth'}}
				style={{marginTop: 20}}
			/>
		);
	}
}
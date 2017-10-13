import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import url from 'url'

export default class LoginView extends Component {


	_onNavigationStateChange =(webViewState) => {

		const parsedUrl = url.parse(webViewState.url)
		console.log(parsedUrl)
		if (parsedUrl.search != null) {
		if (parsedUrl.search.indexOf('error')>=0) {
			console.log('error')
			//this.props.navigation.navigate('Root')
		} else if (parsedUrl.search.indexOf('token')>=0){
			this.props.navigation.navigate('Root')
		}}

	}

	render () {

		return(
			<WebView
				source={{uri: 'http://tp2017.park.bmstu.cloud/tpgeovk/auth'}}
				style={{marginTop: 20}}
				onNavigationStateChange={this._onNavigationStateChange.bind(this)}
			/>
		);
	}
}
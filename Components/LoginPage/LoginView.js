import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView} from 'react-native';
import {Container, Content, Button, Text} from 'native-base';
import url from 'url'

let isLogged = false;
let token;

export default class LoginView extends Component {

	_onNavigationStateChange =(webViewState) => {
			const parsedUrl = url.parse(webViewState.url)
			if (parsedUrl.search != null && !isLogged) {
				if (parsedUrl.search.indexOf('error') >= 0) {
					this.props.navigation.goBack();
				} else if (parsedUrl.search.indexOf('token=') >= 0) {
					token = parsedUrl.search.slice(7,);
					this.props.navigation.navigate('Root', {token: token});
					isLogged = true;
				}
			}

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
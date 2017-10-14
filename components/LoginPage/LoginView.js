import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, WebView, AsyncStorage} from 'react-native';
import url from 'url'

let isLogged = false;

export default class LoginView extends Component {

	_onNavigationStateChange = (webViewState) => {
		const parsedUrl = url.parse(webViewState.url)
		if (parsedUrl.search != null && !isLogged) {
			if (parsedUrl.search.indexOf('error') >= 0) {
				this.props.navigation.goBack();
			} else if (parsedUrl.search.indexOf('token=') >= 0) {
				const token = parsedUrl.search.slice(7,);
				AsyncStorage.setItem('token', token);
				// this.props.navigation.navigate('Root', {token: token});
				isLogged = true;
			}
		}

	}

	render() {
		return (
			<WebView
				source={{uri: 'http://tp2017.park.bmstu.cloud/tpgeovk/auth'}}
				style={{marginTop: 20}}
				onNavigationStateChange={this._onNavigationStateChange.bind(this)}
			/>
		);
	}
}
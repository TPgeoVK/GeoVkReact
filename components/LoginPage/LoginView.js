import React, {Component} from 'react';
import {WebView, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import url from 'url'
import styles from './styleLoginPage'

let isLogged = false;

export default class LoginView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
		}
	}

	_onNavigationStateChange = async (webViewState) => {
		const parsedUrl = url.parse(webViewState.url)
		console.log('parsedUrl',parsedUrl)
		if (parsedUrl.hash !== null && !isLogged) {
			if (parsedUrl.hash.indexOf('access_token=') >= 0) {
				urlHash = parsedUrl.hash.slice(1,).split("&").map( el => el.split("=") )
					.reduce( (pre, cur) => { pre[cur[0]] = cur[1]; return pre; }, {} );

				console.log('parsedUrl.hash.slice(7,)',urlHash.access_token)
				const token = urlHash.access_token;
				await AsyncStorage.setItem('token', token);
				this.props.navigation.dispatch(NavigationActions.reset(
					{
						index: 0,
						key: null,
						actions: [
							NavigationActions.navigate({routeName: 'Root'})
						]
					}
				));
				isLogged = true;
				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token,
					})

				})
				console.log('auth/login',token)


			}
		}

	}

	render() {
		return (
			<WebView
				source={{uri: 'http://tp2017.park.bmstu.cloud/tpgeovk/auth'}}
				style={styles.webview}
				onNavigationStateChange={this._onNavigationStateChange.bind(this)}
			/>
		);
	}
}
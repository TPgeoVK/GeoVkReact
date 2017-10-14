import React, {Component} from 'react';
import {WebView, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import url from 'url'

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
		if (parsedUrl.search !== null && !isLogged) {
			if (parsedUrl.search.indexOf('error') >= 0) {
				this.props.navigation.goBack();
			} else if (parsedUrl.search.indexOf('token=') >= 0) {
				const token = parsedUrl.search.slice(7,);
				await AsyncStorage.setItem('token', token);
				this.props.navigation.dispatch(NavigationActions.reset(
					{
						index: 0,
						actions: [
							NavigationActions.navigate({routeName: 'Root'})
						]
					}
				));
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
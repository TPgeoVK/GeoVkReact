import React, {Component} from 'react';
import {Container, Header,StyleProvider, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text} from 'native-base';

import LoginPage from './Components/LoginPage/LoginPage'
import LoginNavigator from './Components/LoginPage/LoginNavigator'
import CheckinsPage from './Components/CheckinsPage/CheckinsPage'
import Root from './Components/Menu/Menu'
import MapPage from './Components/MapPage/MapPage'
import RecomendationsPage from './Components/RecommendationsPage/RecommendationsPage'
import NewPostPage from './Components/NewPostPage/NewPostPage'


import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isReady: false
		};
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		});

		this.setState({isReady: true});
	}

	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading />;
		}
		return (
			<StyleProvider style={getTheme(platform)}>
				<Container>
					{/*<Root/>*/}
					<LoginNavigator/>
				</Container>

			</StyleProvider>
		);
	}
}

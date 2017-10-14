import React, {Component} from 'react';
import {Container, StyleProvider} from 'native-base';
import LoginNavigator from './navigators/loginNavigator'
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
					<LoginNavigator/>
				</Container>

			</StyleProvider>
		);
	}
}

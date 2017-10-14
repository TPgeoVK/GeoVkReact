import React, {Component} from 'react';
import {Container, StyleProvider} from 'native-base';
import {AsyncStorage} from 'react-native';
import LoginNavigator from './navigators/loginNavigator'
import Root from './navigators/appNavigator'
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';


export default class App extends Component {
	constructor() {
		super();
		this.state = {
			isReady: false,
			isValidToken: false
		};
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
		});

		const token = await AsyncStorage.getItem('token');
		if (token !== null) {
			console.log('check token to bmstu:', token);
			await fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/all?token=' + token)
				.then((response) => response.json())
				.then((responseJson) => {
					if (!responseJson['error'])
						this.setState({isValidToken: true});
					console.log('token valid!');
				})
				.catch((error) => {
					console.error(error);
				});
		}

		this.setState({isReady: true});
	}


	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading/>;
		}
		console.log('validtoken?:', this.state.isValidToken);
		if (this.state.isValidToken) {
			return (
				<StyleProvider style={getTheme(platform)}>
					<Container>
						<Root/>
					</Container>

				</StyleProvider>
			);
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

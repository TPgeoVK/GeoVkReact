import React, {Component} from 'react';
import {Image, Animated, Platform, StatusBar, StyleSheet, TextInput, View,} from 'react-native';
import {Container, Content} from 'native-base';
import AppHeader from '../Header/Header'
import NewPostMenu from '../NewPostPage/NewPostMenu'

export default class App extends Component {
	render() {
		return (
			<Container>
				<AppHeader/>
				<Content>
					<TextInput multiline={true}
					           autoFocus={true}
					           autoCorrect={true}
					           numberOfLines={4}
					           placeholder="What are you doing now?
					            Where are you?"
					           style={{borderWidth: 0, fontSize: 30}}

					/>
				</Content>
				<NewPostMenu navigation={this.props.navigation}/>
			</Container>
		)
	}
}
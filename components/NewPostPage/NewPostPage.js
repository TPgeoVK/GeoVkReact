import React, {Component} from 'react';
import {TextInput} from 'react-native';
import {Container, Content} from 'native-base';
import AppHeader from '../Header/Header'
import NewPostMenu from '../NewPostPage/NewPostMenu'
import styles from './styleNewPostMenu'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class App extends Component {
	render() {
		return (
			<Container>
				<AppHeader/>
				<KeyboardAwareScrollView>
				<Content>
					<TextInput multiline={true}
					           autoFocus={true}
					           autoCorrect={true}
					           numberOfLines={4}
					           placeholder=" Where are you? What are you doing now?"
					           style={styles.input}
					           underlineColorAndroid='transparent'
							  />
				</Content>
				<NewPostMenu navigation={this.props.navigation}/>
				</KeyboardAwareScrollView>
			</Container>
		)
	}
}
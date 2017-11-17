import React, {Component} from 'react';
import {TextInput, KeyboardAvoidingView, Text, AsyncStorage, StatusBar, View} from 'react-native';
import {Container, Content, Card, CardItem, Thumbnail, Button, Left, Body, Right} from 'native-base';
import AppHeader from '../Header/Header'
import NewPostMenu from '../NewPostPage/NewPostMenu'
import styles from './styleNewPostMenu'


export default class NewPostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			place: {
				title: '',
			},
			text: '',
			count: 0,
		};
	}

	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
				let lat = parseFloat(position.coords.latitude);
				let long = parseFloat(position.coords.longitude);

				console.log('coordinates:', lat, long)
				AsyncStorage.multiSet([
					["latitude", lat],
					["longitude", long]
				])
			},
			(error) => {
				console.log(error)
			},
		)


		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			AsyncStorage.multiSet([
				["latitude", lat],
				["longitude", long]
			])
		});


	}


	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID);
		this._onChangeText(this.state.text);
	}

	_onChangeText = async (text) => {
		this.setState({
			text: text,
		});
		this.state.count++;
		console.log(this.state.text)
		if (this.state.text[this.state.text.length - 1] === ' ' || this.state.count % 3 === 0 || this.state.count === 1) {
			console.log('if', this.state.text)
			AsyncStorage.multiGet(['token', 'latitude', 'longitude']).then((data) => {
				let token = data[0][1];
				let latitude = data[1][1];
				let longitude = data[2][1];

				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/location/detectPlace', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						token: token,
						latitude: latitude,
						longitude: longitude,
						text: this.state.text,
					})
				}).then((response) => response.json())
					.then(async (responseJson) => {
						this.setState({
							place: responseJson,
							isLoadingFriends: false,
						});
						console.log('place', this.state.place)
						console.log('text', this.state.text)
					})
					.catch((error) => {
						console.error(error);
					});

			});
		}
	}


	render() {
		return (

			<Container>
				<StatusBar
					barStyle="light-content"
					backgroundColor="#3d5f86"/>
				<AppHeader title={'Новая запись'}/>
				<Content>

					<TextInput multiline={true}
					           autoFocus={true}
					           autoCorrect={true}
					           numberOfLines={4}
					           placeholder="Где Вы? Что сейчас делаете?"
					           style={styles.input}
					           underlineColorAndroid='transparent'
					           onChangeText={(text) => this._onChangeText(text)}
					/>
				</Content>
				<KeyboardAvoidingView>
					<Card style={styles.card}>
						<CardItem>
							<Left>
								<Thumbnail
									source={{uri: this.state.place.placeIcon}}/>
								<Body>
								<Text>{this.state.place.title}</Text>
								<Text note>{this.state.place.distance}</Text>
								</Body>
							</Left>
						</CardItem>
					</Card>

					<NewPostMenu navigation={this.props.navigation} text={this.state.text} place={this.state.place}/>
				</KeyboardAvoidingView>
			</Container>
		)
	}
}
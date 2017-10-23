import React, {Component} from 'react';
import {TextInput, KeyboardAvoidingView, Text,AsyncStorage,StatusBar, View} from 'react-native';
import {Container, Content} from 'native-base';
import AppHeader from '../Header/Header'
import NewPostMenu from '../NewPostPage/NewPostMenu'
import styles from './styleNewPostMenu'



export default class NewPostPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			place: {
				title:'',
			},
			text: '',
		};
	}

	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
				let lat = parseFloat(position.coords.latitude);
				let long = parseFloat(position.coords.longitude);

				console.log('coordinates:',lat,long )
				AsyncStorage.multiSet([
					["latitude", lat],
					["longitude", long]
				])
			},
			(error)=>{console.log(error)},
			// {enableHighAccuracy:true,timeout:20000,maximumAge:1000}
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
		navigator.geolocation.clearWatch(this.watchID)
	}

	_onChangeText = async(text) => {
		this.setState({text});
		console.log('text', text);
		AsyncStorage.multiSet([
			["postText", text],
			["place", this.state.place]
		])
		AsyncStorage.multiGet([ 'token','latitude', 'longitude']).then((data) => {
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
						isLoading: false,
					});
					console.log('place', this.state.place)
					console.log('text', this.state.text)
				})
				.catch((error) => {
					console.error(error); });

		});
	}


	render() {
		return (

			<Container>

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
				<Text>{this.state.place.title}</Text>
				<NewPostMenu navigation={this.props.navigation}/>
			</KeyboardAvoidingView>
			</Container>
		)
	}
}
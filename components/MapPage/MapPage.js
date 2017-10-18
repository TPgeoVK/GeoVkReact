import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styleMapPage'
import Dimensions from 'Dimensions'

const {width, height} = Dimensions.get('window');

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA*ASPECT_RATIO;


export default class LoginPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			initialPosition: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0,
			},

			markerPosition: {
				latitude: 0,
				longitude: 0,
			}
		};
	}
	watchID: ?number = null;

	componentDidMount() {
		navigator.geolocation.getCurrentPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			let initialRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}
			console.log('coordinates:',position )
			this.setState({initialPosition:initialRegion})
			this.setState({markerPosition:initialRegion})
		},
			(error)=>{console.log(error)},
			{enableHighAccuracy:true,timeout:20000,maximumAge:1000})

		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			let lastRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}

			this.setState({initialPosition:lastRegion})
			this.setState({markerPosition:lastRegion})
		});

	}


	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	render() {
		return (
			<View style={styles.container}>
				<MapView
					region={this.state.initialPosition}
					style={styles.map}>
				<MapView.Marker
					coordinate={this.state.markerPosition}/>
				</MapView>
			</View>
		);
	}
}


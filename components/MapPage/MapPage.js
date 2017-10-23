import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View, AsyncStorage} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styleMapPage'
import Dimensions from 'Dimensions'

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


export default class MapPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			position: {
				latitude: 55.7522,
				longitude: 37.6156,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			},

			markerPosition: {
				latitude: 55.7522,
				longitude: 37.6156,
			},
			isLoading: true,
			markersCheckins: [],
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
			};
			let initialMarker = {
				latitude: lat,
				longitude: long,
			};

			// this.setState({position: initialRegion});
			// this.setState({markerPosition: initialRegion});
			// console.log('1', this.state.markerPosition)

			AsyncStorage.getItem('token', (err, result) => {
				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/latest?token=' + result + '&latitude=' + initialMarker.latitude + '&longitude=' + initialMarker.longitude)
					.then((response) => response.json())
					.then(async (responseJson) => {
						this.setState({
							markerPosition: initialMarker,
							position: initialRegion,
							markersCheckins: responseJson,
							isLoading: false,
						});
						console.log(this.state);
					})
					.catch((error) => {
						console.error(error);
					});
			});
		}, (error) => {
			console.log(error)
		},
			// {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
			);

		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			let lastRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			};

			let lastMarker = {
				latitude: lat,
				longitude: long,
			};

			// this.setState({position: lastRegion});
			// this.setState({markerPosition: lastRegion});
			// console.log('2', this.state.markerPosition)

			AsyncStorage.getItem('token', (err, result) => {
				fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/latest?token=' + result + '&latitude=' + lastMarker.latitude + '&longitude=' + lastMarker.longitude)
					.then((response) => response.json())
					.then(async (responseJson) => {
						this.setState({
							markerPosition: lastMarker,
							position: lastRegion,
							markersCheckins: responseJson,
							isLoading: false,
						})
					})
					.catch((error) => {
						console.error(error);
					});
			});
		});


	}

	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	render() {
		if (this.state.isLoading) {
			console.log('!!!!')
			console.log(this.state.markersCheckins)
			console.log(this.state.markerPosition)
			return (
				<View style={styles.container}>
					<MapView
						region={this.state.position}
						style={styles.map}>
						<MapView.Marker coordinate={this.state.markerPosition}/>
					</MapView>
				</View>
			);
		} else {
			console.log('Loading!')
			console.log(this.state.markersCheckins)
			console.log(this.state.markerPosition)
		return (
			<View style={styles.container}>
				<MapView
					region={this.state.position}
					style={styles.map}>
					<MapView.Marker coordinate={this.state.markerPosition}/>
					{this.state.markersCheckins.map(checkin => (
						<MapView.Marker
							key={checkin.checkinId}
							coordinate={{
								'latitude': checkin.place.latitude,
								'longitude': checkin.place.longitude
							}}
							image={checkin.user.photo200}/>))}
							{/*<Image*/}
								{/*source={require({uri: checkin.user.photo200}})*/}
								{/*style={styles.circle}*/}
							{/*/>*/}
						{/*</MapView.Marker>))*/}

				</MapView>
			</View>
		);}
	}
}


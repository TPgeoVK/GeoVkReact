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
			initialPosition: {
				latitude: 0,
				longitude: 0,
				latitudeDelta: 0,
				longitudeDelta: 0,
			},

			markerPosition: {
				latitude: 0,
				longitude: 0,
			},
			isLoading: true,
			checkinsList: [],
		};
		this.markersCheckins = [];
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
				console.log('coordinates:', position)
				this.setState({initialPosition: initialRegion})
				this.setState({markerPosition: initialRegion})

				AsyncStorage.getItem('token', (err, result) => {
					fetch('http://tp2017.park.bmstu.cloud/tpgeovk/vkapi/checkins/latest?token=' + result + '&latitude=' + initialRegion.latitude + '&longitude=' + initialRegion.longitude)
						.then((response) => response.json())
						.then(async (responseJson) => {
							this.setState({
								checkinsList: responseJson,
								isLoading: false,
							})
							responseJson.map(checkin => {
								this.markersCheckins.push(
									{
										'checkinId': checkin.checkinId,
										'coordinates': {
											'latitude': checkin.place.latitude,
											'longitude': checkin.place.longitude,
										},
										'photo': checkin.user.photo200,
									}
								)
							})
						})
						.catch((error) => {
							console.error(error);
						});
				});
			},
			(error) => {
				console.log(error)
			},
			{enableHighAccuracy: true, timeout: 20000, maximumAge: 1000})

		this.watchID = navigator.geolocation.watchPosition((position) => {
			let lat = parseFloat(position.coords.latitude);
			let long = parseFloat(position.coords.longitude);
			let lastRegion = {
				latitude: lat,
				longitude: long,
				latitudeDelta: LATITUDE_DELTA,
				longitudeDelta: LONGITUDE_DELTA,
			}

			this.setState({initialPosition: lastRegion})
			this.setState({markerPosition: lastRegion})

			//TODO:
		});


	}


	componentWillMount() {
		navigator.geolocation.clearWatch(this.watchID)
	}


	render() {
		console.log(this.markersCheckins)
		return (
			<View style={styles.container}>
				<MapView
					region={this.state.initialPosition}
					style={styles.map}>
					<MapView.Marker coordinate={this.state.markerPosition}/>
					{this.markersCheckins.map(checkin => (
						<MapView.Marker key={checkin.checkinId} coordinate={checkin.coordinates}>
							<Image
								source={{uri: checkin.photo}}
								style={styles.circle}
							/>
						</MapView.Marker>
					))}
				</MapView>
			</View>
		);
	}
}


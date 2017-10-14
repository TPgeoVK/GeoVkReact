import React, {Component} from 'react';
import {AppRegistry, Image, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import styles from './styleMapPage'

export default class LoginPage extends Component {
	render() {
		return (
			<View style={styles.container}>
				<MapView
					region={{
						latitude: 37.78825,
						longitude: -122.4324,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421,
					}} style={styles.map}
				/>

			</View>
		);
	}
}


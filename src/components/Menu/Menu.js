import React from 'react';
import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator } from 'react-navigation';
import {AsyncStorage} from 'react-native';
import {Container, Footer, FooterTab, Button,} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckinsPage from '../CheckinsPage/CheckinsPage'
import RecommendationsPage from '../RecommendationsPage/RecommendationsPage'
import MapPage from '../MapPage/MapPage'
import NewPost from '../NewPostPage/NewPostPage'
import styles from './styleMenu'

import {NavigationActions} from 'react-navigation';
import Cookie from 'react-native-cookie';


const Menu = ({navigation, activeTabName}) => {

	const _logOut = async () => {
		const token = await AsyncStorage.getItem('token');
		if (token !== null) {
			fetch('http://tp2017.park.bmstu.cloud/tpgeovk/auth/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: token
				})

			}).then(()=>{console.log('logout')})

		}
		Cookie.clear();
		await AsyncStorage.removeItem('token');
		console.log(await AsyncStorage.getItem('token'))
	}

	const {routes} = navigation.state;
	return (
		<Footer>
			<FooterTab>
				<Button vertical
				        title={"Map"}
				        onPress={() => navigation.navigate('Map')}>
					<Icon
						style={(activeTabName == 'Map') ? styles.activeIcon : styles.icon}
						name="map"
					/>
				</Button>
				<Button vertical
				        title={"Checkins"}
				        onPress={() => navigation.navigate('Checkins')}>
					<Icon style={(activeTabName == 'Checkins') ? styles.activeIcon : styles.icon}
					      name="account-circle"/>
				</Button>
				<Button vertical
				        title={"Recommendations"}
				        onPress={() => navigation.navigate('Recommendations')}>
					<Icon style={(activeTabName == 'Recommendations' ) ? styles.activeIcon : styles.icon}
					      name="search"/>
				</Button>
				<Button vertical
				        title={"logOut"}
				        onPress={() =>{
					        navigation.navigate('Login');
					        _logOut()
				        } } //TODO
				>

					<Icon style={(activeTabName == 'LogOut' ) ? styles.activeIcon : styles.icon}
					      name="exit-to-app"/>
				</Button>
			</FooterTab>
		</Footer>
	);
};

export default Menu;
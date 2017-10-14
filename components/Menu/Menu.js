import React from 'react';
import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator
} from 'react-navigation';
import {Container, Footer, FooterTab, Button,} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckinsPage from '../CheckinsPage/CheckinsPage'
import RecommendationsPage from '../RecommendationsPage/RecommendationsPage'
import MapPage from '../MapPage/MapPage'
import NewPost from '../NewPostPage/NewPostPage'
import styles from './styleMenu'


const Menu = ({navigation, activeTabName}) => {
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
			</FooterTab>
		</Footer>
	);
};

export default Menu;
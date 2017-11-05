import React from 'react';
import {Container, Footer, FooterTab, Button,} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

				<Button vertical
				        title={"Settings"}
				        onPress={() => navigation.navigate('Settings')}>
					<Icon style={(activeTabName == 'Settings' ) ? styles.activeIcon : styles.icon}
					      name="settings"/>
				</Button>

			</FooterTab>
		</Footer>
	);
};

export default Menu;
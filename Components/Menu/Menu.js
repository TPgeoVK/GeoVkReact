import React from 'react';

import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,StackNavigator
} from 'react-navigation';

import {Container, Header, Content, Footer, FooterTab, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckinsPage from '../CheckinsPage/CheckinsPage'
import RecommendationsPage from '../RecommendationsPage/RecommendationsPage'
import MapPage from '../MapPage/MapPage'
import NewPost from '../NewPostPage/NewPostPage'


const RecommendationsScreen = ({navigation}) => (
	<RecommendationsPage navigation={navigation}/>
);

const CheckinsScreen = ({navigation}) => (
	<CheckinsPage navigation={navigation}/>
);

const MapScreen = ({navigation}) => (
	<MapPage navigation={navigation}/>
);

const NewPostScreen = () => (
	<NewPost/>
);


const CustomTabBar = ({navigation}) => {
	const {routes} = navigation.state;
	return (
		<Footer>
			<FooterTab>
				<Button vertical
				        title={"Map"}
				        onPress={() => navigation.navigate('Map')}>
					<Icon style={styles.icon} name="map"/>
				</Button>
				<Button vertical
				        title={"Checkins"}
				        onPress={() => navigation.navigate('Checkins')}>
					<Icon style={styles.icon} name="account-circle"/>
				</Button>
				<Button vertical
				        title={"Recommendations"}
				        onPress={() => navigation.navigate('Recommendations')}>
					<Icon style={styles.icon} active name="search"/>
				</Button>
			</FooterTab>
		</Footer>
	);
};

const CustomTabView = ({router, navigation}) => {
	const {routes, index} = navigation.state;
	const ActiveScreen = router.getComponentForRouteName(routes[index].routeName);
	return (
		<Container>
			<ActiveScreen
				navigation={addNavigationHelpers({
					...navigation,
					state: routes[index],
				})}
			/>
			<CustomTabBar navigation={navigation}/>
		</Container>
	);
};

const CustomTabRouter = TabRouter(
	{
		Checkins: {
			screen: CheckinsScreen,
			path: '',
		},
		Map: {
			screen: MapScreen,
			path: 'Map',
		},
		Recommendations: {
			screen: RecommendationsScreen,
			path: 'Recommendations',
		},
	},
	{
		// Change this to start on a different tab
		initialRouteName: 'Checkins',
	}
);

const CustomTabs = createNavigationContainer(
	createNavigator(CustomTabRouter)(CustomTabView)
);

const Root = StackNavigator({
	CustomTabs: {
		screen: CustomTabs,
	},
	NewPost: {
		screen: NewPost,
	}
}, {
	mode: 'modal',
	headerMode: 'none',
});


export default Root;
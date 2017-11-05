import React from 'react';
import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,
	StackNavigator,NavigationActions
} from 'react-navigation';
import {Container, Footer, FooterTab, Button,} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CheckinsPage from '../components/CheckinsPage/CheckinsPage'
import RecommendationsPage from '../components/RecommendationsPage/RecommendationsPage'
import MapPage from '../components/MapPage/MapPage'
import SettingsPage from '../components/SettingsPage/SettingsPage'
import NewPost from '../components/NewPostPage/NewPostPage'
import Menu from '../components/Menu/Menu'
import LoginNavigator from './loginNavigator'


const CustomTabView = ({router, navigation}) => {
	const {routes, index} = navigation.state;
	const ActiveScreen = router.getComponentForRouteName(routes[index].routeName);
	const ActiveTab = routes[index].routeName
	if (ActiveTab !== 'Login') {
		return (
			<Container>
				<ActiveScreen
					navigation={addNavigationHelpers({
						...navigation,
						state: routes[index],
					})}
				/>
				<Menu navigation={navigation} activeTabName={ActiveTab}/>
			</Container>
		);
	} return (
		<Container>
			<ActiveScreen
				navigation={addNavigationHelpers({
					...navigation,
					state: routes[index],
				})}
			/>

		</Container>
	);

};

const RecommendationsScreen = ({navigation}) => (
	<RecommendationsPage navigation={navigation}/>
);

const CheckinsScreen = ({navigation}) => (
	<CheckinsPage navigation={navigation}/>
);

const MapScreen = ({navigation}) => (
	<MapPage navigation={navigation}/>
);


const SettingsScreen = ({navigation}) => (
	<SettingsPage navigation={navigation}/>
);

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

		Settings: {
			screen: SettingsScreen,
			path: 'Settings',
		},

		Login: {
			screen: ({ navigation }) => <LoginNavigator screenProps={{ rootNavigation: navigation }} />

		}

	},
	{
		initialRouteName: 'Checkins',
	}
);

const CustomTabs = createNavigationContainer(
	createNavigator(CustomTabRouter)(CustomTabView)
);

const Root = StackNavigator(
	{
		CustomTabs: {
			screen: CustomTabs,
		},
		NewPost: {
			screen: NewPost,
		}

	},

	{
		mode: 'modal',
		headerMode: 'none',
	});


export default Root;
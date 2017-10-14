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
import CheckinsPage from '../components/CheckinsPage/CheckinsPage'
import RecommendationsPage from '../components/RecommendationsPage/RecommendationsPage'
import MapPage from '../components/MapPage/MapPage'
import NewPost from '../components/NewPostPage/NewPostPage'
import Menu from '../components/Menu/Menu'


const CustomTabView = ({router, navigation}) => {
	const {routes, index} = navigation.state;
	const ActiveScreen = router.getComponentForRouteName(routes[index].routeName);
	const ActiveTab = routes[index].routeName
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
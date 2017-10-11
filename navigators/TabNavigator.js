import { TabNavigator } from 'react-navigation';
import Checkins from '../Components/CheckinsPage/CheckinsPage';
import MapPage from '../Components/MapPage/MapPage';
import Recommendations from '../Components/RecommendationsPage/RecommendationsPage';

export const BottomTabNavigator = TabNavigator({

    Checkins: { screen: Checkins },
    MapPage: { screen: MapPage },
    Recommendations: { screen: Recommendations },
});
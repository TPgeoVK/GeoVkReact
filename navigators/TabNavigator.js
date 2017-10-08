import { TabNavigator } from 'react-navigation';
import Checkins from '../Components/CheckinsPage/CheckinsPage';

export const BottomTabNavigator = TabNavigator({
    Checkins: { screen: Checkins },
});
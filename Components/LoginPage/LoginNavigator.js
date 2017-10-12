import { TabNavigator } from 'react-navigation';
import LoginPage from '../LoginPage/LoginPage/';
import LoginView from '../LoginPage/LoginView/';
import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers,StackNavigator
} from 'react-navigation';

const LoginNavigator = StackNavigator({
	LoginPage: {
		screen: LoginPage,
	},
	LoginView: {
		screen: LoginView,
	}
}, {
	mode: 'modal',
	headerMode: 'none',
});


export default LoginNavigator;
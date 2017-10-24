import LoginPage from '../components/LoginPage/LoginPage';
import LoginView from '../components/LoginPage/LoginView';
import Root from './appNavigator';
import {
	createNavigator,
	createNavigationContainer,
	TabRouter,
	addNavigationHelpers, StackNavigator
} from 'react-navigation';

const LoginNavigator = StackNavigator({
		LoginPage: {
			screen: LoginPage,
		},
		LoginView: {
			screen: LoginView,
		},
		Root: {
			screen: Root,
		}

	},
	{
		mode: 'modal',
		headerMode: 'none',
	});


export default LoginNavigator;
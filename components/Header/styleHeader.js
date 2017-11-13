import {Platform, StatusBar} from 'react-native';

export default styles = {
	text: {
		color: '#fff',
		fontSize: 20,
	},
	header: {
		paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
		height: 70,
	}
}
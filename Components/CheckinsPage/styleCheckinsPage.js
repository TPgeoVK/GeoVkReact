import * as consts from './constantsCheckinsPage'
import {Platform,} from 'react-native';

export default styles = {
	fill: {
		flex: 1,
	},
	content: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		backgroundColor: '#6796CC',
		overflow: 'hidden',
		height: consts.HEADER_MAX_HEIGHT,
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: null,
		height: consts.HEADER_MAX_HEIGHT,
		resizeMode: 'cover',
	},
	bar: {
		backgroundColor: 'transparent',
		marginTop: Platform.OS === 'ios' ? 28 : 38,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
	},
	title: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 28,
	},
	scrollViewContent: {
		marginTop: consts.HEADER_MAX_HEIGHT,
	},
	row: {
		height: 40,
		margin: 16,
		backgroundColor: '#D3D3D3',
		alignItems: 'center',
		justifyContent: 'center',
	},

	circle: {
		width: 150,
		height: 150,
		borderRadius: 150/2,
	}
}
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
	bar: {
		backgroundColor: 'transparent',
		marginTop: Platform.OS === 'ios' ? 25 : 35,
		height: 32,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		top: 190,
		left: 0,
		right: 0,
	},
	title: {
		backgroundColor: 'transparent',
		color: 'white',
		fontSize: 30,
	},
	scrollViewContent: {
		marginTop: consts.HEADER_MAX_HEIGHT,
		flex:1,
	},
	row: {
		height: 40,
		margin: 16,
		backgroundColor: '#D3D3D3',
		alignItems: 'center',
		justifyContent: 'center',
	},

	circle: {
		position: 'absolute',
		top: 50,
		width: 150,
		height: 150,
		borderRadius: 150 / 2,
	},

	fabIcon: {
		color: '#fff'
	},

	fab: {
		backgroundColor: '#6796CC'
	},

	card: {
		flex: 0,
		flexWrap: 'nowrap'
	},

	footer: {
		borderTopWidth: 0.5,
		borderTopColor: '#a7a8aa',
	},

	footerItem: {
		height: 40
	},

	cardIcon: {
		fontSize: 25,
		color: '#a7a8aa',
	},

	text: {
		fontSize: 15,
		color: '#a7a8aa',
	},
	activityIndicator: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},

}
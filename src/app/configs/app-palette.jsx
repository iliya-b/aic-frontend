'use strict';

// Material design
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

const awPink700 = '#240058';
const awViolet700 = '#a70447';

const awViolet500 = ColorManipulator.fade(awViolet700, 0.7);
const awViolet300 = ColorManipulator.fade(awViolet700, 0.5);
const awPink500 = ColorManipulator.fade(awPink700, 0.7);
const awPink300 = ColorManipulator.fade(awPink700, 0.5);

const AppPalette = {
	// Base theme colors
	primary1Color: awPink500, // Colors.lightBlue500,
	primary2Color: awPink700, // Colors.lightBlue700,
	primary3Color: awPink300, // Colors.lightBlue300,
	accent1Color: awViolet500, // Colors.lightGreen500,
	accent2Color: awViolet700, // Colors.lightGreen700,
	accent3Color: awViolet300, // Colors.lightGreen300,
	textColor: Colors.darkBlack,
	alternateTextColor: Colors.white,
	canvasColor: Colors.white,
	borderColor: Colors.grey300,
	disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	pickerHeaderColor: awPink500, // Colors.lightBlue500,
	clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
	shadowColor: Colors.fullBlack,

	// App Colors
	logo1Color: '#2D8BCB',
	logo2Color: '#A2C846',
	textLightColor: Colors.grey200,
	errorColor: Colors.red500,
	successColor: '#A2C846',
	hoverColor: awPink300, // Colors.lightBlue100,
	warnColor: Colors.amber800,
	toolbarBGColor: '#e6e6e6'
};

module.exports = AppPalette;

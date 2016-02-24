'use strict';

// Material design
const mui = require('material-ui');
const Colors = mui.Styles.Colors;
const ColorManipulator = mui.Utils.ColorManipulator;

const GobyPalette = {
	primary1Color: Colors.lightBlue500,
	primary2Color: Colors.lightBlue700,
	primary3Color: Colors.lightBlue300,
	accent1Color: Colors.lightGreen500,
	accent2Color: Colors.lightGreen700,
	accent3Color: Colors.lightGreen300,
	textColor: Colors.darkBlack,
	canvasColor: Colors.white,
	borderColor: Colors.grey300,
	disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	logo1Color: '#2D8BCB',
	logo2Color: '#A2C846',
	textLightColor: Colors.grey200,
	errorColor: Colors.red500,
	successColor: '#A2C846',
	hoverColor: Colors.lightBlue100,
	warnColor: Colors.amber800
};

module.exports = GobyPalette;

'use strict';

// Material design
import * as Colors from 'material-ui/styles/colors';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

// const alterwayPink = '#a70447';
// const alterwayViolet = '#240058';
// const oldLogoBlue = '#2D8BCB';
// const oldPrimaryColor = Colors.lightBlue*;
// const oldSecondaryColor = Colors.lightGreen*;

const newLogoBlue = '#10598a';
// const newLogoGreen = '#a2c646';
const anotherGreen = '#85ac1f';

const primaryColor500 = newLogoBlue;
// const secondaryColor500 = newLogoGreen;
const secondaryColor500 = anotherGreen;

const secondaryColor700 = ColorManipulator.darken(secondaryColor500, 0.7);
// const secondaryColor500 = ColorManipulator.fade(secondaryColor700, 0.7);
const secondaryColor300 = ColorManipulator.fade(secondaryColor700, 0.5);

const primaryColor700 = ColorManipulator.darken(primaryColor500, 0.7);
// const primaryColor500 = ColorManipulator.fade(primaryColor700, 0.7);
const primaryColor300 = ColorManipulator.fade(primaryColor700, 0.5);

// const secondaryColor700 = Colors.green700;
// const secondaryColor500 = Colors.green500;
// const secondaryColor300 = Colors.green300;

const textColor = 'rgba(0, 0, 0, 0.6)';

const AppPalette = {
	// Base theme colors
	primary1Color: primaryColor500,
	primary2Color: primaryColor700,
	primary3Color: primaryColor300,
	accent1Color: secondaryColor500,
	accent2Color: secondaryColor700,
	accent3Color: secondaryColor300,
	textColor,
	alternateTextColor: Colors.white,
	canvasColor: Colors.white,
	borderColor: Colors.grey300,
	disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
	pickerHeaderColor: primaryColor500,
	clockCircleColor: ColorManipulator.fade(Colors.darkBlack, 0.07),
	shadowColor: Colors.fullBlack,

	// App Colors
	logo1Color: primaryColor700,
	textLightColor: Colors.grey200,
	errorColor: Colors.red500,
	successColor: '#A2C846',
	hoverColor: primaryColor300,
	warnColor: Colors.amber800,
	toolbarBGColor: '#e6e6e6',
	panelbarIconColor: textColor
};

module.exports = AppPalette;

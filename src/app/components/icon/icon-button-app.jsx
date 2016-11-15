'use strict';

import React from 'react';
import {IconButton} from 'material-ui';

const IconButtonApp = (props, context) => {
	const {
		primary,
		secondary,
		iconStyle,
		on,
		off,
		raised,
		...others
	} = props;
	let calcIconStyle = {};

	// Check for inconsistent properties
	if (primary && secondary) {
		throw new Error('Please define only one property, either primary or secondary');
	}
	if (on && off) {
		throw new Error('Please define only one property, either on or off');
	}

	if (primary || (on && !primary && !secondary)) {
		calcIconStyle = {color: context.muiTheme.palette.primary1Color};
	}
	if (secondary) {
		calcIconStyle = {color: context.muiTheme.palette.accent1Color};
	}

	if (off) {
		calcIconStyle = {color: context.muiTheme.palette.disabledColor};
	}

	if (raised) {
		calcIconStyle = {
			color: context.muiTheme.palette.primary1Color,
			textShadow: '1px 1px 0 rgba(0, 0, 0, 0.25), -1px -1px 0 #fff'
		};
	}

	// Like this others can override color property
	const finalProps = Object.assign({}, calcIconStyle, others);

	return (
		<IconButton iconStyle={Object.assign(calcIconStyle, iconStyle)} {...finalProps}/>
	);
};

IconButtonApp.contextTypes = {
	muiTheme: React.PropTypes.object
};

IconButtonApp.propTypes = {
	primary: React.PropTypes.bool,
	secondary: React.PropTypes.bool,
	iconStyle: React.PropTypes.object,
	on: React.PropTypes.bool,
	off: React.PropTypes.bool,
	raised: React.PropTypes.bool
};

module.exports = IconButtonApp;

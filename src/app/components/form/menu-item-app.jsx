'use strict';

import React from 'react';

const MenuItemApp = (props, context) => {
	const {
		disabled,
		desktop,
		style,
		primaryText,
		...other
	} = props;
	const disabledColor = context.muiTheme.baseTheme.palette.disabledColor;
	const textColor = context.muiTheme.baseTheme.palette.textColor;
	const sidePadding = props.desktop ? 24 : 16;
	const styleRoot = {
		color: disabled ? disabledColor : textColor,
		cursor: disabled ? 'not-allowed' : 'pointer',
		lineHeight: desktop ? '32px' : '48px',
		fontSize: desktop ? 15 : 16,
		whiteSpace: 'nowrap'
	};
	const styleText = {
		paddingLeft: sidePadding,
		paddingRight: sidePadding,
		paddingBottom: 0,
		paddingTop: 0,
		boxSizing: 'border-box',
		width: '100%',
		display: 'block'
	};
	if (style.width) {
		Object.assign(styleText, {
			maxWidth: styleRoot.width - 90,
			overflow: 'hidden',
			textOverflow: 'ellipsis'
		});
	}

	return (
		<div {...other} style={Object.assign(styleRoot, style)}><span style={styleText}>{primaryText}</span></div>
	);
};

MenuItemApp.contextTypes = {
	muiTheme: React.PropTypes.object
};

MenuItemApp.propTypes = {
	primaryText: React.PropTypes.node,
	disabled: React.PropTypes.bool,
	desktop: React.PropTypes.bool,
	style: React.PropTypes.object
};

module.exports = MenuItemApp;

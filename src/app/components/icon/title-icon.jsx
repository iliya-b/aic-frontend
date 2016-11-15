'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';

const TitleIcon = (props, context) => {
	const {
		style,
		...other
	} = props;
	const styleTitle = {
		color: context.muiTheme.palette.accent1Color,
		textShadow: '1px 1px 0 #fff, -1px -1px #777'
	};
	const mergedStyle = Object.assign({}, styleTitle, style);
	return (
		<FontIcon style={mergedStyle} {...other}/>
	);
};

TitleIcon.contextTypes = {
	muiTheme: React.PropTypes.object
};

TitleIcon.propTypes = {
	style: React.PropTypes.object
};

module.exports = TitleIcon;

'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import ToolbarSeparator from 'material-ui/Toolbar/ToolbarSeparator';

const PanelToolbarBase = props => {
	const {
		style,
		children,
		icon,
		...other
	} = props;

	const stylePaper = {height: 56};
	const styleIcon = {
		margin: '15px 10px 0 10px',
		float: 'left'
	};
	const styleSeparator = {
		float: 'left',
		margin: '0 0px 0 0px'
	};

	const iconStyleMerged = Object.assign({}, styleIcon, icon.props.style);
	const styledIcon = React.cloneElement(icon, {style: iconStyleMerged, color: icon.props.color ? icon.props.color : 'rgba(0, 0, 0, 0.4)'});

	return (
		<Paper style={Object.assign(stylePaper, style)} {...other}>
			{styledIcon}
			<ToolbarSeparator style={styleSeparator}/>
			{children}
		</Paper>
	);
};

PanelToolbarBase.propTypes = {
	zDepth: 1,
	style: {}
};

PanelToolbarBase.propTypes = {
	zDepth: React.PropTypes.number,
	style: React.PropTypes.object,
	children: React.PropTypes.node,
	icon: React.PropTypes.node
};

module.exports = PanelToolbarBase;

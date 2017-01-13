'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
import MachineIcon from 'app/components/icon/machine-icon';
import StatusIcon from 'app/components/icon/status-icon';
import {getColorByStatus} from 'app/libs/helpers';

const PanelInfo = (props, context) => {
	const {
		style,
		showIcon,
		children,
		status,
		size,
		...other
	} = props;

	const colorStatus = getColorByStatus(status);
	const styleRoot = {
		padding: 20,
		color: colorStatus ? colorStatus : context.muiTheme.palette.textColor
	};

	const styleSizes = {};
	styleSizes[PanelInfo.BIG] = {
		fontSize: '20px',
		textAlign: 'center'
	};
	styleSizes[PanelInfo.BIGGER] = styleSizes[PanelInfo.BIG];

	const styleChildren = {
		display: 'inline-block',
		verticalAlign: 'top',
		paddingTop: '15px'
	};
	const styleChildrenSizes = {};
	styleChildrenSizes[PanelInfo.BIGGER] = {
		paddingTop: '50px',
		width: '77%'
	};

	let content;
	if (showIcon) {
		const statusProp = {};
		if (status) {
			statusProp.status = status;
		}
		content = [
			<MachineIcon {...statusProp} size={size} style={{marginRight: '10px'}} key={1}/>,
			<div style={Object.assign(styleChildren, styleChildrenSizes[size] || {})} key={2}>{children}</div>
		];
	} else {
		content = children;
	}

	return (
		<Paper style={Object.assign(styleRoot, styleSizes[size] || {}, style || {})} {...other}>
			{content}
		</Paper>
		);
};

PanelInfo.contextTypes = {
	muiTheme: React.PropTypes.object
};

// TODO: status properties should be a HOC or something else
PanelInfo.STATUS_LIST = StatusIcon.STATUS_LIST;
PanelInfo.SIZE_LIST = StatusIcon.SIZE_LIST;

// TODO: This only works because the keys are the values inside them
// it should be less prone to error on changes
PanelInfo.STATUS_LIST.forEach(s => {
	PanelInfo[s] = StatusIcon[s];
});
PanelInfo.SIZE_LIST.forEach(s => {
	PanelInfo[s] = StatusIcon[s];
});

PanelInfo.propTypes = {
	children: React.PropTypes.node,
	style: React.PropTypes.object,
	showIcon: React.PropTypes.bool,
	status: React.PropTypes.oneOf(PanelInfo.STATUS_LIST),
	size: React.PropTypes.oneOf(PanelInfo.SIZE_LIST)
};

module.exports = PanelInfo;

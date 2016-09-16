'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import AppPalette from 'app/configs/app-palette';

const statusColors = {
	OK: AppPalette.successColor,
	ERROR: AppPalette.errorColor,
	NOTFOUND: AppPalette.primary1Color,
	LOADING: AppPalette.primary1Color,
	QUEUED: AppPalette.disabledColor,
	REQUESTED: AppPalette.disabledColor
};

const statusIcons = {
	OK: <FontIcon className="mdi mdi-check" style={{color: statusColors.OK}}/>,
	ERROR: <FontIcon className="mdi mdi-close" style={{color: statusColors.ERROR}}/>,
	NOTFOUND: <FontIcon className="mdi mdi-help" style={{color: statusColors.NOTFOUND}}/>,
	LOADING: <FontIcon className="mdi mdi-reload" style={{color: statusColors.LOADING, animation: 'liveIconRotate 3s linear infinite'}}/>,
	QUEUED: <FontIcon className="mdi mdi-timer" style={{color: statusColors.QUEUED}}/>,
	REQUESTED: <FontIcon className="mdi mdi-clock-fast" style={{color: statusColors.REQUESTED}}/>
};

// Aliases
statusIcons.FAILURE = statusIcons.ERROR;
statusColors.FAILURE = statusColors.ERROR;
statusIcons.INSTALLING = statusIcons.LOADING;
statusColors.INSTALLING = statusColors.LOADING;
statusIcons.RUNNING = statusIcons.LOADING;
statusColors.RUNNING = statusColors.LOADING;
statusIcons.READY = statusIcons.OK;
statusColors.READY = statusColors.OK;
statusIcons.SUCCESS = statusIcons.OK;
statusColors.SUCCESS = statusColors.OK;

const SimpleStatusIcon = props => {
	if (props.status in SimpleStatusIcon.STATUS_LIST) {
		return statusIcons[props.status];
	}
	return statusIcons.NOTFOUND;
};

SimpleStatusIcon.STATUS_LIST_ARR = Object.keys(statusIcons);
SimpleStatusIcon.STATUS_LIST = {};
SimpleStatusIcon.STATUS_LIST_ARR.forEach(k => {
	SimpleStatusIcon.STATUS_LIST[k] = k;
});

SimpleStatusIcon.STATUS_COLORS = statusColors;

// TODO: investigate why SimpleStatusIcon.STATUS_LIST_ARR is typeof object ???
SimpleStatusIcon.propTypes = {
	status: React.PropTypes.oneOf(SimpleStatusIcon.STATUS_LIST_ARR)
};

module.exports = SimpleStatusIcon;

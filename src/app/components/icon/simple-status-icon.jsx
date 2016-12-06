'use strict';

import React from 'react';

import FontIcon from 'material-ui/FontIcon';
import AppPalette from 'app/configs/app-palette';
import Tooltip from 'material-ui/internal/Tooltip';

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
statusIcons['COMPILING DSL'] = statusIcons.LOADING;
statusColors['COMPILING DSL'] = statusColors.LOADING;
statusIcons['COMPILING JAVA'] = statusIcons.LOADING;
statusColors['COMPILING JAVA'] = statusColors.LOADING;

const SimpleStatusIcon = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {tooltipOpen: false};
	}

	handleOpenTooltip = () => {
		this.setState({tooltipOpen: true});
	}

	handleCloseTooltip = () => {
		this.setState({tooltipOpen: false});
	}

	render() {
		let icon;

		const tooltipPositionSplitted = this.props.tooltipPosition ? this.props.tooltipPosition.split('-') : ['', ''];
		const tooltipElement = this.props.withTooltip && (
			<Tooltip
				label={this.props.tooltip ? this.props.tooltip : this.props.status}
				show={this.state.tooltipOpen}
				verticalPosition={tooltipPositionSplitted[0]}
				horizontalPosition={tooltipPositionSplitted[1]}
				/>
		);

		if (this.props.status in SimpleStatusIcon.STATUS_LIST) {
			icon = statusIcons[this.props.status];
		} else {
			icon = statusIcons.NOTFOUND;
		}

		return <span style={this.props.style} onMouseOver={this.handleOpenTooltip} onMouseOut={this.handleCloseTooltip}>{icon}{tooltipElement}</span>;
	}
};

SimpleStatusIcon.STATUS_LIST_ARR = Object.keys(statusIcons);
SimpleStatusIcon.STATUS_LIST = {};
SimpleStatusIcon.STATUS_LIST_ARR.forEach(k => {
	SimpleStatusIcon.STATUS_LIST[k] = k;
});

SimpleStatusIcon.STATUS_COLORS = statusColors;

// TODO: investigate why SimpleStatusIcon.STATUS_LIST_ARR is typeof object ???
SimpleStatusIcon.propTypes = {
	status: React.PropTypes.string,
	withTooltip: React.PropTypes.bool,
	tooltip: React.PropTypes.string,
	tooltipPosition: React.PropTypes.string,
	style: React.PropTypes.object
};

SimpleStatusIcon.defaultProps = {
	tooltipPosition: 'top-center'
};

module.exports = SimpleStatusIcon;

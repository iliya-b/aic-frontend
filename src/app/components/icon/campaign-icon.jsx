'use strict';

import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import StatusIcon from 'app/components/icon/status-icon';

const debug = require('debug')('AiC:Components:Icon:CampaignIcon');

const campaign2Status = {};

const CampaignIcon = props => {
	debug('render');
	const {
		status,
		...others
	} = props;
	const icon = <FontIcon className="mdi mdi-settings"/>;

	const translatedStatus = campaign2Status[status];
	return (
		<StatusIcon status={translatedStatus} icon={icon} {...others}/>
		);
};

CampaignIcon.ERROR = 'ERROR';
CampaignIcon.RUNNING = 'RUNNING';
CampaignIcon.READY = 'READY';
CampaignIcon.QUEUED = 'QUEUED';

campaign2Status[CampaignIcon.ERROR] = StatusIcon.ERROR;
campaign2Status[CampaignIcon.RUNNING] = StatusIcon.LOADING;
campaign2Status[CampaignIcon.READY] = StatusIcon.SUCCESS;
campaign2Status[CampaignIcon.QUEUED] = StatusIcon.QUEUED;

CampaignIcon.STATUS_LIST = [
	CampaignIcon.ERROR,
	CampaignIcon.RUNNING,
	CampaignIcon.READY,
	CampaignIcon.QUEUED
];
CampaignIcon.SIZE_LIST = StatusIcon.SIZE_LIST;

CampaignIcon.propTypes = {
	status: React.PropTypes.oneOf(CampaignIcon.STATUS_LIST),
	size: React.PropTypes.oneOf(CampaignIcon.SIZE_LIST)
};

module.exports = CampaignIcon;

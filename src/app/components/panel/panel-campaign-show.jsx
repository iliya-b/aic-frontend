'use strict';

import React from 'react';
import Paper from 'material-ui/Paper';
// import DroidPercentage from 'app/components/icon/droid-percentage';
import LabeledSpan from 'app/components/form/labeled-span';
import CampaignIcon from 'app/components/icon/campaign-icon';

const PanelCampaignShow = props => {
	const progressPerc = props.progress * 100;
	return (
		<Paper>
			<CampaignIcon style={{marginTop: 3, float: 'left'}} tooltip={props.campaign_status} status={props.campaign_status}/>
			<LabeledSpan value={`${progressPerc}%`} label="total progress"/>
			<LabeledSpan value={props.campaign_id} label="id"/>
			<LabeledSpan value={props.campaign_name} label="name"/>
		</Paper>
	);
};

PanelCampaignShow.propTypes = {
	progress: React.PropTypes.number,
	campaign_id: React.PropTypes.string, // eslint-disable-line camelcase
	campaign_name: React.PropTypes.string, // eslint-disable-line camelcase
	campaign_status: React.PropTypes.string // eslint-disable-line camelcase
};

module.exports = PanelCampaignShow;

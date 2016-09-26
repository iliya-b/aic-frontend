'use strict';

import React from 'react';
import CampaignStore from 'app/stores/campaign';
import Notify from 'app/libs/notify';
import PanelCampaignShow from 'app/components/panel/panel-campaign-show';

const debug = require('debug')('AiC:Views:Campaign:CampaignShow');

const CampaignShow = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (!this.state.campaign) {
			return <div>Loading</div>;
		}
		return <PanelCampaignShow {...this.state.campaign.campaign} machines={this.state.campaign.machines}/>;
	}

	shouldStopListSessions = () => {
		return this.state.campaign && this.state.campaign.campaign.status === 'READY' &&
			this.state.campaign.machines && this.state.campaign.machines.length === 0;
	}

	handleStateChange = newState => {
		this.setState(newState);
		if (this.shouldStopListSessions()) {
			Notify.stopListSessionsCampaign({projectId: this.props.params.projectId, campaignId: this.props.params.campaignId});
		}
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = CampaignStore.listen(this.handleStateChange);
		Notify.watchCampaign({campaignId: this.props.params.campaignId});
		Notify.startCampaignRead({projectId: this.props.params.projectId, campaignId: this.props.params.campaignId});
		Notify.startListSessionsCampaign({projectId: this.props.params.projectId, campaignId: this.props.params.campaignId});
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe();
		Notify.clearCampaign({campaignId: this.props.params.campaignId});
	}
};

CampaignShow.contextTypes = {
	router: React.PropTypes.object
};

CampaignShow.propTypes = {
	params: React.PropTypes.object
};

module.exports = CampaignShow;

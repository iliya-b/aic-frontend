'use strict';

import React from 'react';
import ToolbarCampaign from 'app/components/toolbar/toolbar-campaign';
import ListCampaignContainer from 'app/containers/list-campaign-container';
import DialogCampaignCreation from 'app/components/dialog/dialog-campaign-creation';
import QuotaCampaignContainer from 'app/containers/quota-campaign-container';
import APKStore from 'app/stores/apk';
import APKActions from 'app/actions/apk';
import LiveStore from 'app/stores/live';
import LiveActions from 'app/actions/live';
import CampaignActions from 'app/actions/campaign';
import Notify from 'app/libs/notify';

const debug = require('debug')('AiC:Views:Campaign:CampaignList');

const CampaignList = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isDialogOpen: false
		};
	}

	handleEnterCampaign = campaignId => {
		this.context.router.push(`/projects/${this.props.params.projectId}/campaign/${campaignId}`);
	}

	handleOpenDialog = () => {
		this.setState({isDialogOpen: true});
	}

	handleCloseDialog = () => {
		this.setState({isDialogOpen: false});
	}

	handleStartCampaign = config => {
		config.projectId = this.props.params.projectId;
		CampaignActions.create(config);
		this.handleCloseDialog();
		Notify.startListCampaigns({projectId: this.props.params.projectId}, null, {initialDelaySeconds: 1});
	}

	render() {
		const apks = this.state && this.state.apk ? this.state.apk.apks : [];
		const images = this.state && this.state.live ? this.state.live.images : [];
		return (
			<div>
				<ToolbarCampaign onClickStart={this.handleOpenDialog}/>
				<QuotaCampaignContainer projectId={this.props.params.projectId}/>
				<ListCampaignContainer projectId={this.props.params.projectId} onEnter={this.handleEnterCampaign}/>
				<DialogCampaignCreation onCancel={this.handleCloseDialog} onStart={this.handleStartCampaign} open={this.state.isDialogOpen} apks={apks} images={images}/>
			</div>
		);
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = [];
		this.unsubscribe.push(APKStore.listen(this.handleStateChange));
		this.unsubscribe.push(LiveStore.listen(this.handleStateChange));
		APKActions.list({projectId: this.props.params.projectId});
		LiveActions.listImages();
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe.map(fn => fn());
	}
};

CampaignList.contextTypes = {
	router: React.PropTypes.object
};

CampaignList.propTypes = {
	params: React.PropTypes.object
};

module.exports = CampaignList;

'use strict';

import React from 'react';
import ToolbarCampaign from 'app/components/toolbar/toolbar-campaign';
import ListCampaignContainer from 'app/containers/list-campaign-container';
import DialogCampaignCreation from 'app/components/dialog/dialog-campaign-creation';
import QuotaCampaignContainer from 'app/containers/quota-campaign-container';
import APKStore from 'app/stores/apk';
import APKActions from 'app/actions/apk';
import LiveListStore from 'app/stores/live-list';
import LiveListActions from 'app/actions/live-list';
import CampaignActions from 'app/actions/campaign';
import Notify from 'app/libs/notify';
import DialogConfirmDelete from 'app/components/dialog/dialog-confirm-delete';

const debug = require('debug')('AiC:Views:Campaign:CampaignList');

const CampaignList = class extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			isDialogOpen: false,
			deleteCampaignName: null,
			deleteCampaignId: null,
			deleteIsOpen: false
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
		this.reloadList();
	}

	handleDeleteCampaign = campaignInfo => {
		this.setState({
			deleteCampaignName: campaignInfo.name,
			deleteCampaignId: campaignInfo.id,
			deleteIsOpen: true
		});
	}

	handleCloseDeleteDialog = () => {
		this.setState({
			deleteCampaignName: null,
			deleteCampaignId: null,
			deleteIsOpen: false
		});
	}

	handleConfirmDeleteDialog = () => {
		CampaignActions.delete({campaignId: this.state.deleteCampaignId, projectId: this.props.params.projectId});
		this.handleCloseDeleteDialog();
		this.reloadList();
	}

	reloadList = () => {
		Notify.startListCampaigns({projectId: this.props.params.projectId}, null, {initialDelaySeconds: 1});
	}

	render() {
		const apks = this.state && this.state.apk ? this.state.apk.apks : [];
		const images = this.state && this.state.liveList ? this.state.liveList.images : [];
		const deleteCampaignName = this.state.deleteCampaignName ? <b> {this.state.deleteCampaignName}</b> : null;
		return (
			<div>
				<ToolbarCampaign onClickStart={this.handleOpenDialog}/>
				<QuotaCampaignContainer projectId={this.props.params.projectId}/>
				<ListCampaignContainer projectId={this.props.params.projectId} onEnter={this.handleEnterCampaign} onDelete={this.handleDeleteCampaign}/>
				<DialogCampaignCreation onCancel={this.handleCloseDialog} onStart={this.handleStartCampaign} open={this.state.isDialogOpen} apks={apks} images={images}/>
				<DialogConfirmDelete deleteItemName={deleteCampaignName} open={this.state.deleteIsOpen} onRequestClose={this.handleCloseDeleteDialog} onCancel={this.handleCloseDeleteDialog} onConfirm={this.handleConfirmDeleteDialog}/>
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
		this.unsubscribe.push(LiveListStore.listen(this.handleStateChange));
		APKActions.list({projectId: this.props.params.projectId});
		LiveListActions.listImages();
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

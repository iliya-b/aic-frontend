'use strict';

import React from 'react';
import CampaignActions from 'app/actions/campaign';
import CampaignStore from 'app/stores/campaign';
import ListCampaign from 'app/components/list/list-campaign';

const ListCampaignContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<ListCampaign
				isLoading={!(this.state.campaign)}
				campaigns={this.state.campaign ? this.state.campaign.campaigns : []}
				onEnter={this.props.onEnter}
				/>
		);
	}

	list() {
		CampaignActions.list({projectId: this.props.projectId});
	}

	handleStateChange = newState => {
		this.setState(newState);
		const statusList = ['RUNNING', 'QUEUED'];
		const shouldListAgain = newState.campaign.campaigns.reduce((p, c) => (!p && statusList.indexOf(c.status) !== -1 ? true : p), false);
		if (shouldListAgain) {
			setTimeout(() => {
				this.list();
			}, 1000);
		}
	}

	componentDidMount() {
		this.unsubscribe = CampaignStore.listen(this.handleStateChange);
		this.list();
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

};

ListCampaignContainer.propTypes = {
	projectId: React.PropTypes.string,
	onEnter: React.PropTypes.func
};

module.exports = ListCampaignContainer;

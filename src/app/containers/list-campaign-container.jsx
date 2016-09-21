'use strict';

import React from 'react';
import CampaignStore from 'app/stores/campaign';
import ListCampaign from 'app/components/list/list-campaign';
import Notify from 'app/libs/notify';

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

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		this.unsubscribe = CampaignStore.listen(this.handleStateChange);
		Notify.watchProjectCampaigns({projectId: this.props.projectId});
		Notify.startListCampaigns({projectId: this.props.projectId});
	}

	componentWillUnmount() {
		this.unsubscribe();
		Notify.clearProjectCampaigns({projectId: this.props.projectId});
	}

};

ListCampaignContainer.propTypes = {
	projectId: React.PropTypes.string,
	onEnter: React.PropTypes.func
};

module.exports = ListCampaignContainer;

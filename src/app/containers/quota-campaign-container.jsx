'use strict';

import React from 'react';
import UserStore from 'app/stores/user';
import PanselSessionsInfo from 'app/components/panel/panel-sessions-info';
import Notify from 'app/libs/notify';
import AppPalette from 'app/configs/app-palette';

const debug = require('debug')('AiC:Containers:QuotaCampaignContainer');

const QuotaCampaignContainer = class extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		// User quota
		const campaignCurrent = this.state.user && this.state.user.quota ? this.state.user.quota.vmAsyncCurrent : 0;
		const campaignMax = this.state.user && this.state.user.quota ? this.state.user.quota.vmAsyncMax : 0;

		return (
			<PanselSessionsInfo bgColor={campaignCurrent > campaignMax ? AppPalette.errorColor : AppPalette.primary1Color} vmCount={campaignCurrent} vmMaxAllowed={campaignMax}/>
		);
	}

	handleStateChange = newState => {
		this.setState(newState);
	}

	componentDidMount() {
		debug('componentDidMount');
		this.unsubscribe = UserStore.listen(this.handleStateChange);
		Notify.watchProjectCampaigns({projectId: this.props.projectId});
		Notify.startUserQuotaCampaign({projectId: this.props.projectId});
	}

	componentWillUnmount() {
		debug('componentWillUnmount');
		this.unsubscribe();
		Notify.clearProjectCampaigns({projectId: this.props.projectId});
	}

};

QuotaCampaignContainer.propTypes = {
	projectId: React.PropTypes.string
};

module.exports = QuotaCampaignContainer;

'use strict';

import Reflux from 'reflux';
import CampaignActions from 'app/actions/campaign';

const debug = require('debug')('AiC:Stores:Campaign');

const CampaignStore = Reflux.createStore({

	// Base Store //

	listenables: CampaignActions,

	init() {
		this.state = {campaign: {}};
	},

	// Actions //

	onListCompleted(data) {
		this.state.campaign.campaigns = data;
		this.state.campaign.status = 'listCompleted';
		this.updateState();
	},

	onNotifyList(actionInfo, response) {
		this.state.campaign.campaigns = response;
		this.state.campaign.status = 'listCompleted';
		this.updateState();
	},

	onReadCompleted(data) {
		this.state.campaign.campaign = data;
		this.state.campaign.status = 'showCompleted';
		this.updateState();
		debug('onReadCompleted', data);
	},

	onCreateCompleted(data) {
		debug('onCreateCompleted', data);
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}
});

module.exports = CampaignStore;

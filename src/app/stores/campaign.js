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

	onInitiate() {
		this.state = {campaign: {}};
		this.updateState();
	},

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

	onNotifyRead(actionInfo, data) {
		this.state.campaign.campaign = data;
		this.state.campaign.status = 'showCompleted';
		this.updateState();
		debug('onNotifyRead', data);
	},

	onNotifySessionList(actionInfo, data) {
		this.state.campaign.machines = data.filter(a => a.campaignId === this.state.campaign.campaign.id);
		this.updateState();
		debug('onNotifySessionList', data);
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

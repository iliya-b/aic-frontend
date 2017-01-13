'use strict';

import Reflux from 'reflux';
import LiveListActions from 'app/actions/live-list';

const debug = require('debug')('AiC:Stores:LiveList');

const LiveListStore = Reflux.createStore({

	// Base Store //

	listenables: LiveListActions,

	init() {
		this.state = {};
		this.state.liveList = {};
	},

	// Actions //

	onNotifyList(requestInfo, avms) {
		debug('onNotifyList', avms);
		this.state.liveList.avms = avms;
		this.state.liveList.status = 'LIVE_STATUS_LISTED';
		this.updateState();
	},

	// Live list
	onListImages() {
		debug('onListImages');
	},

	onListImagesCompleted(images) {
		debug('onListImagesCompleted', images);
		this.state.liveList.images = images;
		this.updateState();
	},

	onListImagesFailed(errorMessage) {
		debug('onListImagesFailed');
		this.state.liveList.status = 'LIVE_STATUS_LIST_IMAGES_FAILED';
		this.state.liveList.message = errorMessage;
		this.updateState();
	},

	// State update

	updateState() {
		debug('updateState', 'new state', this.state);
		this.trigger(this.state);
	}

});

module.exports = LiveListStore;

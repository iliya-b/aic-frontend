'use strict';

// This store + actions SHOULD BE REMOVED!!!! //

// Reflux
const Reflux = require('reflux');

// Vendor
const debug = require('debug')('AiC:Polling:Store');

// APP
const MachineCard = require('app/components/project/machine-card');
const PollingActions = require('app/actions/polling');
// const NotificationActions = require('app/actions/notification');
import LiveActions from 'app/actions/live';

// function areDifferentObjects(obj1, obj2) {
// 	return JSON.stringify(obj1) !== JSON.stringify(obj2);
// }

// const initialRetry = 3;

const verifyResponse = {
	liveList: res => {
		const onGoingStatus = [MachineCard.VMSTATE.CREATING, MachineCard.VMSTATE.DELETING];
		return res.reduce((previous, avm) => {
			return previous ? previous : (onGoingStatus.indexOf(avm.avm_status) !== -1);
		}, false);
	}
};

const actionTypes = {
	liveList: LiveActions.list
};

// Store
const PollingStore = Reflux.createStore({

	// Base Store //

	listenables: PollingActions,

	init() {
		this.state = {polling: {}};
		this.updateState();
	},

	// Actions //

	onStart(type) {
		this.state.polling[type] = this.state.polling[type] || {timeout: false};
		debug('start', type);

		this.onStop(type);

		actionTypes[type]()
		.then(res => {
			debug('is list finished?', res);
			if (verifyResponse[type](res)) {
				this.scheduleRetry(type);
			}
		}, res => {
			debug('is list finished with error?', res);
		});
	},

	onStop(type) {
		if (this.state.polling[type] && this.state.polling[type].timeout) {
			clearTimeout(this.state.polling[type].timeout);
			this.state.polling[type].timeout = false;
		}
	},

	scheduleRetry(type) {
		debug('scheduleRetry on type', type);
		if (this.state.polling[type] && this.state.polling[type].timeout !== false) {
			debug('scheduleRetry on type', type, 'already scheduled', this.state.polling);
			return;
		}
		const timing = 1000;
		this.state.polling[type].timeout = setTimeout(PollingActions.start, timing, type);
	},

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = PollingStore;

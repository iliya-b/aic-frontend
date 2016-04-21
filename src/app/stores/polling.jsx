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
	},
	liveProperties: () => {
		return true;
	},
	liveLoadInfo: () => {
		return true;
	}
};

const actionTypes = {
	liveList: LiveActions.list,
	liveProperties: LiveActions.properties,
	liveLoadInfo: LiveActions.loadInfo
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

	onStart(actionType, actionPayload, actionExtraOptions) {
		this.state.polling[actionType] = this.state.polling[actionType] || {timeout: false};
		debug('start', actionType, actionPayload, actionExtraOptions);
		debug('startargs', arguments);

		this.onStop(actionType);

		actionTypes[actionType](actionPayload, actionExtraOptions)
		.then(res => {
			debug('is list finished?', res);
			if (verifyResponse[actionType](res)) {
				this.scheduleRetry(actionType, actionPayload, actionExtraOptions);
			}
		}, res => {
			debug('is list finished with error?', res);
			if (verifyResponse[actionType](res)) {
				this.scheduleRetry(actionType, actionPayload, actionExtraOptions);
			}
		});
	},

	onStop(actionType) {
		if (this.state.polling[actionType] && this.state.polling[actionType].timeout) {
			clearTimeout(this.state.polling[actionType].timeout);
			this.state.polling[actionType].timeout = false;
		}
	},

	onStopAll() {
		const actionTypes = Object.keys(this.state.polling);
		actionTypes.forEach(actionType => {
			this.onStop(actionType);
		});
	},

	// Methods

	scheduleRetry(actionType, actionPayload, actionExtraOptions) {
		debug('scheduleRetry on actionType', actionType);
		if (this.state.polling[actionType] && this.state.polling[actionType].timeout !== false) {
			debug('scheduleRetry on actionType', actionType, 'already scheduled', this.state.polling);
			return;
		}
		const timing = 1000;
		this.state.polling[actionType].timeout = setTimeout(PollingActions.start, timing, actionType, actionPayload, actionExtraOptions);
	},

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = PollingStore;

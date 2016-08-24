'use strict';

// This store + actions SHOULD BE REMOVED!!!! //

import Reflux from 'reflux';
import MachineCard from 'app/components/project/machine-card';
import PollingActions from 'app/actions/polling';
import LiveActions from 'app/actions/live';

const debug = require('debug')('AiC:Polling:Store');

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
		this.state.polling[actionType].shouldStop = false;
		debug('start', actionType, actionPayload, actionExtraOptions);
		debug('startargs', arguments);

		// this.onStop(actionType);
		clearTimeout(this.state.polling[actionType].timeout);
		this.state.polling[actionType].timeout = false;
		// if stop is called here it bugs everything :(

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
		debug('onStop', actionType, this.state.polling[actionType]);
		if (this.state.polling[actionType] && this.state.polling[actionType].timeout) {
			debug('stopping', this.state.polling);
			clearTimeout(this.state.polling[actionType].timeout);
			this.state.polling[actionType].timeout = false;
			this.state.polling[actionType].shouldStop = true;
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
		debug('scheduleRetry on actionType', actionType, this.state.polling[actionType]);
		if (this.state.polling[actionType] && this.state.polling[actionType].timeout !== false) {
			debug('scheduleRetry on actionType', actionType, 'already scheduled', this.state.polling);
			return;
		}
		if (this.state.polling[actionType].shouldStop) {
			debug('scheduleRetry on actionType', actionType, 'but it should stop', this.state.polling);
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

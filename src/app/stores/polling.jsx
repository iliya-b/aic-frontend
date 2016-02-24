'use strict';

// This store + actions SHOULD BE REMOVED!!!! //

// Reflux
const Reflux = require('reflux');

// Vendor
const debuggerGoby = require('debug')('AiC:Polling:Store');

// APP
const MachineCard = require('app/components/project/machine-card');
const {
	PollingActions,
	NotificationActions
} = require('app/actions');

function areDifferentObjects(obj1, obj2) {
	return JSON.stringify(obj1) !== JSON.stringify(obj2);
}

const initialRetry = 3;

// Store
const PollingStore = Reflux.createStore({

	// Base Store //

	listenables: PollingActions,

	init() {
		this.state = {polling: {}};
		this.updateState();
	},

	// Actions //

	// Live list
	onLiveList() {
		this.doRetry('liveList', null, initialRetry);
	},

	onStopLiveList() {

	},

	// Retry
	onRetry() {

	},

	onRetryCompleted(res, apiIndex, apiArgs, tries) {
		debuggerGoby('retry completed, state:', this.state);
		if (areDifferentObjects(res, this.state.polling[apiIndex].data)) {
			debuggerGoby('object different');
			NotificationActions.update(apiIndex, res);
			this.state.polling[apiIndex].data = res;
		} else {
			debuggerGoby('object same');
			const remainingTries = tries - 1;
			if (remainingTries > 0) {
				this.doRetry(apiIndex, apiArgs, remainingTries);
			} else {
				debuggerGoby('No tries left and no changes detected.', arguments);
			}
		}
		this.checkData(res, apiIndex, apiArgs);
	},

	onRetryFailure() {
		debuggerGoby('something very bad happened!', arguments);
	},

	// Methods //

	doRetry(apiIndex, apiArgs, remainingTries) {
		// 1st try: 1s, 2nd try: 6s, 3rd (and last): 11s
		const timing = ((initialRetry - remainingTries) + 1) * 1000;
		this.state.polling[apiIndex] = this.state.polling[apiIndex] || {};
		this.resetRetry(apiIndex);
		this.state.polling[apiIndex].timeout = setTimeout(PollingActions.retry, timing, apiIndex, apiArgs, remainingTries);
		this.state.polling[apiIndex].data = this.state.polling[apiIndex].data || undefined;
	},

	resetRetry(apiIndex) {
		if (this.state.polling[apiIndex].timeout) {
			clearTimeout(this.state.polling[apiIndex].timeout);
		}
		this.state.polling[apiIndex].timeout = false;
	},

	checkData(res, apiIndex) {
		switch (apiIndex) {
			case 'liveList':
				const onGoingStatus = [MachineCard.VMSTATE.CREATING, MachineCard.VMSTATE.DELETING];
				const avms = res.avms;
				let avm;
				debuggerGoby('checking avms:', avms, onGoingStatus);
				for (let avmIndex = 0; avmIndex < avms.length; avmIndex++) {
					avm = avms[avmIndex];
					debuggerGoby('checking', avm.avm_status);
					if (onGoingStatus.indexOf(avm.avm_status) !== -1) {
						debuggerGoby('polling again');
						PollingActions.liveList();
						break;
					}
				}
				break;
			default:
				debuggerGoby('apiIndex not found', arguments);
		}
	},

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = PollingStore;

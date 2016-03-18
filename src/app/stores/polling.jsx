'use strict';

// This store + actions SHOULD BE REMOVED!!!! //

// Reflux
const Reflux = require('reflux');

// Vendor
const debug = require('debug')('AiC:Polling:Store');

// APP
const MachineCard = require('app/components/project/machine-card');
const PollingActions = require('app/actions/polling');
const NotificationActions = require('app/actions/notification');

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
		this.doRetry('live', 'list', [], initialRetry);
	},

	onStopLiveList() {

	},

	// Retry
	onRetry() {

	},

	onRetryCompleted(res, apiIndex, apiAction, apiArgs, tries) {
		debug('retry completed, state:', this.state);
		if (areDifferentObjects(res, this.state.polling[apiIndex][apiAction].data)) {
			debug('object different');
			NotificationActions.update(apiIndex, apiAction, res);
			this.state.polling[apiIndex][apiAction].data = res;
		} else {
			debug('object same');
			const remainingTries = tries - 1;
			if (remainingTries > 0) {
				this.doRetry(apiIndex, apiAction, apiArgs, remainingTries);
			} else {
				debug('No tries left and no changes detected.', arguments);
			}
		}
		this.checkData(res, apiIndex, apiAction, apiArgs);
	},

	onRetryFailure() {
		debug('something very bad happened!', arguments);
	},

	// Methods //

	doRetry(apiIndex, apiAction, apiArgs, remainingTries) {
		// 1st try: 1s, 2nd try: 6s, 3rd (and last): 11s
		const timing = ((initialRetry - remainingTries) + 1) * 1000;
		this.state.polling[apiIndex] = this.state.polling[apiIndex] || {};
		this.state.polling[apiIndex][apiAction] = this.state.polling[apiIndex][apiAction] || {};
		this.resetRetry(apiIndex, apiAction);
		this.state.polling[apiIndex][apiAction].timeout = setTimeout(PollingActions.retry, timing, apiIndex, apiAction, apiArgs, remainingTries);
		this.state.polling[apiIndex][apiAction].data = this.state.polling[apiIndex][apiAction].data || undefined;
	},

	resetRetry(apiIndex, apiAction) {
		if (this.state.polling[apiIndex][apiAction].timeout) {
			clearTimeout(this.state.polling[apiIndex][apiAction].timeout);
		}
		this.state.polling[apiIndex][apiAction].timeout = false;
	},

	checkData(res, apiIndex, apiAction) {
		switch (apiIndex) {
			case 'live': {
				switch (apiAction) {
					case 'list': {
						const onGoingStatus = [MachineCard.VMSTATE.CREATING, MachineCard.VMSTATE.DELETING];
						const avms = res;
						debug('checking avms:', avms, onGoingStatus);
						for (let avmIndex = 0; avmIndex < avms.length; avmIndex++) {
							const avm = avms[avmIndex];
							debug('checking', avm.avm_status);
							if (onGoingStatus.indexOf(avm.avm_status) !== -1) {
								debug('polling again');
								PollingActions.liveList();
								break;
							}
						}
						break;
					}
					default:
						break;
				}
				break;
			}
			default:
				debug('apiIndex not found', arguments);
		}
	},

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = PollingStore;

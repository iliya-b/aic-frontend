'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debug = require('debug')('AiC:Polling:Actions');

// APP
const BackendAPI = require('app/stores/backend-api');
// const AppUtils = require('app/components/shared/app-utils');
const LiveListActions = require('./live-list');

// Actions
const PollingActions = Reflux.createActions({
	liveList: {},
	retry: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

PollingActions.retry.listen(function (apiIndex, apiArgs, remainingTries) {
	debug('retry called', arguments);
	Reflect.apply(BackendAPI[apiIndex], BackendAPI, apiArgs)
	.then(res => {
		this.completed(res, apiIndex, apiArgs, remainingTries);
	})
	.catch(res => {
		this.failure(res, apiIndex, apiArgs, remainingTries);
	});

	switch (apiIndex) {
		case 'liveList':
			LiveListActions.list();
			break;
		default:
			debug('apiIndex not found', arguments);
	}
});

module.exports = PollingActions;

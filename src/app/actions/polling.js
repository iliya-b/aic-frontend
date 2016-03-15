'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Polling:Actions');

// APP
import BackendAPI from 'app/libs/backend-api';
import LiveListActions from 'app/actions/live-list';

// Actions
const PollingActions = Reflux.createActions({
	liveList: {},
	retry: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

PollingActions.retry.listen(function (apiIndex, apiArgs, remainingTries) {
	debug('retry called', arguments);
	debug('BackendAPI', BackendAPI);
	// Reflect.apply(BackendAPI[apiIndex], BackendAPI, apiArgs)
	BackendAPI[apiIndex](...apiArgs)
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

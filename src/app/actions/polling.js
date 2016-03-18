'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Polling:Actions');

// APP
import Gateway from 'app/libs/gateway';
import LiveListActions from 'app/actions/live-list';

// Actions
const PollingActions = Reflux.createActions({
	liveList: {},
	retry: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

PollingActions.retry.listen(function (apiIndex, apiAction, apiArgs, remainingTries) {
	debug('retry called', arguments);
	Gateway[apiIndex][apiAction](...apiArgs)
	.then(res => {
		this.completed(res, apiIndex, apiAction, apiArgs, remainingTries);
	})
	.catch(res => {
		this.failure(res, apiIndex, apiAction, apiArgs, remainingTries);
	});

	switch (apiIndex) {
		case 'live':
			switch (apiAction) {
				case 'list':
					LiveListActions.list();
					break;
				default:
					break;
			}
			break;
		default:
			debug('apiIndex not found', arguments);
	}
});

module.exports = PollingActions;

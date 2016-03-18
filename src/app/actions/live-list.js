'use strict';

// Vendor
import Reflux from 'reflux';

// APP
import Gateway from 'app/libs/gateway';

// Actions
const LiveListActions = Reflux.createActions({
	list: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls
LiveListActions.list.listen(function () {
	Gateway.live.list()
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
});

module.exports = LiveListActions;

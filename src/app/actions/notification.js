'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debug = require('debug')('AiC:Polling:Store');

// APP
const LiveListActions = require('./live-list');

// Actions
const NotificationActions = Reflux.createActions({

});

// Listeners for asynchronous Backend API calls

NotificationActions.update = function (apiIndex, res) {
	switch (apiIndex) {
		case 'liveList':
			LiveListActions.list.completed(res.avms);
			break;
		default:
			debug('unknow api index:', arguments);
	}
};

module.exports = NotificationActions;

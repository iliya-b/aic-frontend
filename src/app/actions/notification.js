'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Actions:Notification');

// APP
import LiveListActions from 'app/actions/live-list';

// Actions
const NotificationActions = Reflux.createActions({

});

// Listeners for asynchronous Backend API calls

NotificationActions.update = function (apiIndex, res) {
	debug('NotificationActions.update', apiIndex, res, arguments);
	switch (apiIndex) {
		case 'liveList':
			debug('NotificationActions.update liveList');
			LiveListActions.list.completed(res.avms);
			break;
		default:
			debug('unknow api index:', arguments);
	}
};

module.exports = NotificationActions;

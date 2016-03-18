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

NotificationActions.update = function (apiIndex, apiAction, res) {
	debug('NotificationActions.update', apiIndex, apiAction, res, arguments);
	switch (apiIndex) {
		case 'live':
			switch (apiAction) {
				case 'list':
					debug('NotificationActions.update liveList');
					LiveListActions.list.completed(res);
					break;
				default:
					break;
			}
			break;
		default:
			debug('unknow api index:', arguments);
	}
};

module.exports = NotificationActions;

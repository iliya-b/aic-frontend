'use strict';

// Vendor
import Reflux from 'reflux';

// Actions
const PollingActions = Reflux.createActions({
	start: {},
	stop: {},
	stopAll: {}
});

module.exports = PollingActions;

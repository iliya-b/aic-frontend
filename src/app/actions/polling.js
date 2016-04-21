'use strict';

// Vendor
import Reflux from 'reflux';

// Actions
const PollingActions = Reflux.createActions({
	start: {},
	stop: {}
});

module.exports = PollingActions;

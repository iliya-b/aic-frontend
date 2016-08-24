'use strict';

import Reflux from 'reflux';

const PollingActions = Reflux.createActions({
	start: {},
	stop: {},
	stopAll: {}
});

module.exports = PollingActions;

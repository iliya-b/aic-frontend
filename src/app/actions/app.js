'use strict';

import Reflux from 'reflux';

const AppActions = Reflux.createActions({
	displayServerError: {},
	hideServerError: {},
	notFound: {},
	notFoundOff: {}
});

module.exports = AppActions;

'use strict';

import Reflux from 'reflux';

const AppActions = Reflux.createActions({
	displayServerError: {},
	hideServerError: {},
	notFound: {},
	notFoundOff: {},
	displaySnackBar: {},
	closeSnackBar: {}
});

module.exports = AppActions;

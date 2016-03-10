'use strict';

// Vendor
import Reflux from 'reflux';
// const debug = require('debug')('AiC:Actions:App');

// Actions
const AppActions = Reflux.createActions({
	displayServerError: {},
	hideServerError: {}
});

module.exports = AppActions;

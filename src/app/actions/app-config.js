/* global window */
'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debug = require('debug')('AiC:Actions:AppConfig');

// APP
const BackendAPI = require('app/stores/backend-api');

// Actions
const AppConfigActions = Reflux.createActions({
	load: {children: ['completed', 'failure']}
});

// Listeners for asynchronous calls
AppConfigActions.load.listen(() => {
	const options = {
		url: 'config.json',
		method: 'GET'
	};
	BackendAPI.apiCall(options)
	.then(data => {
		debug('load.listen then', arguments);
		AppConfigActions.load.completed(data);
	})
	.catch((data, textStatus, errorThrown) => {
		debug('load.listen catch', arguments);
		AppConfigActions.load.failure(errorThrown);
	});
});

AppConfigActions.loadConfigPromise = false;

AppConfigActions.loadConfigFactory = function () {
	debug('loadConfigFactory');

	// Configuration is already loaded
	if (window.GobyAppGlobals.config) {
		debug('loadConfigFactory loaded');
		return new Promise(resolve => {
			resolve(true);
		});
	}

	// Another promise for configuration load already exists
	if (AppConfigActions.loadConfigPromise) {
		debug('loadConfigFactory exists');
		return AppConfigActions.loadConfigPromise;
	}

	// First time loading configuration
	debug('loadConfigFactory creating');

	AppConfigActions.loadConfigPromise = new Promise((resolve, reject) => {
		BackendAPI.loadConfig(result => {
			if (result.hasOwnProperty('status') && result.status !== 200) {
				debug('loadConfigFactory backend', arguments);
				reject('Error!');
			} else if (result.hasOwnProperty('backend')) {
				debug('result', result);
				window.GobyAppGlobals.config = result;
				resolve(true);
			} else {
				debug('loadConfigFactory backend', arguments);
				reject('It was not possible to verify login status.');
			}
		});
	});

	return AppConfigActions.loadConfigPromise;
};

module.exports = AppConfigActions;

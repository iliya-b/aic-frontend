'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debug = require('debug')('AiC:Store:AppConfig');

// APP
const AppConfigActions = require('app/actions/app-config');

// Store
const AppConfigStore = Reflux.createStore({

	// Base Store //

	listenables: AppConfigActions,

	init() {
		this.state = {};
		this.state.config = {};
	},

	// Actions //

	onLoad() {
		//
	},

	onLoadCompleted(data) {
		debug('onLoadCompleted', data);
		this.state.config = data;
		this.state.config.isLoaded = true;
		this.state.config.hasErrors = false;
		this.updateState();
	},

	onLoadFailed(error) {
		debug('onLoadFailed', error);
		this.state.config.isLoaded = true;
		this.state.config.hasErrors = true;
		this.state.config.error = error;
		this.updateState();
	},

	// Methods //

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = AppConfigStore;

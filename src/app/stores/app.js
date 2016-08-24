'use strict';

import Reflux from 'reflux';
import AppActions from 'app/actions/app';

const debug = require('debug')('AiC:Stores:App');

const AuthStore = Reflux.createStore({

	// Base Store //

	listenables: AppActions,

	init() {
		this.state = {
			app: {
				serverError: {
					open: false,
					message: null
				},
				notFound: false
			}
		};
		this.updateState();
	},

	// Actions //

	// Server Error
	onDisplayServerError(message) {
		debug('onDisplayServerError', message);
		this.state.app.serverError.open = true;
		this.state.app.serverError.message = message;
		this.updateState();
	},

	onHideServerError() {
		this.state.app.serverError.open = false;
		this.state.app.serverError.message = null;
		this.updateState();
	},

	onNotFound() {
		this.state.app.notFound = true;
		this.updateState();
	},

	onNotFoundOff() {
		this.state.app.notFound = false;
		this.updateState();
	},

	// Methods //

	// State update

	updateState() {
		debug('updateState', this.state);
		this.trigger(this.state);
	}

});

module.exports = AuthStore;

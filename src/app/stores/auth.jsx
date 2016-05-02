/* global localStorage */
'use strict';

// Vendors
const Reflux = require('reflux');
const debug = require('debug')('AiC:Stores:Auth');

// APP
const AuthActions = require('app/actions/auth');

// Store
const AuthStore = Reflux.createStore({

	// Base Store //

	listenables: AuthActions,

	init() {
		this.state = {login: {}};
		this.updateState();
	},

	// Actions //

	// Login
	onLogin() {
		this.state.login.status = 'LOGIN_STATUS_CONNECTING';
		this.updateState();
	},

	// onLoginCompleted(message) {
	onLoginCompleted(result) {
		debug('then auth login');
		debug('arguments', arguments);
		debug('result.status', result.status, `---${result.status}---`, result.status === 401, result.hasOwnProperty('status'), 'status' in result);
		if ('status' in result &&
			(result.status === 400 || result.status === 401)) {
			debug('400 || 401');
			this.onLoginFailedMessage(`It was not possible to login. Authentication server response was an error. Error: ${result.statusText}`);
		} else if (result.hasOwnProperty('token')) {
			debug('valid token');
			localStorage.token = result.token;
			this.state.login.status = 'LOGIN_STATUS_CONNECTED';
			this.updateState();
		} else {
			debug('unknown response');
			this.onLoginFailedMessage('It was not possible to login. Unknown authentication server response.');
		}
		// this.state.login.status = 'LOGIN_STATUS_CONNECTED';
		// this.updateState();
	},

	onLoginFailed(result) {
		debug('onLoginFailed result', arguments);
		debug('result.response', result.response);
		this.onLoginCompleted(result.response);
	},

	onLoginFailedMessage(errorMessage) {
		this.state.login.message = errorMessage;
		this.state.login.status = 'LOGIN_STATUS_CONNECT_FAILED';
		this.updateState();
	},

	// Logout
	// onLogout(showMessage) {
	onLogout(showMessage) {
		// TODO: this should be solved differently
		// The problem is that the multiple api calls fired at once,
		// call logout multiple times
		if (this.state.login.status !== 'LOGIN_STATUS_DISCONNECTED' && this.state.login.status !== 'LOGIN_STATUS_DISCONNECTING') {
			this.state.login.showMessage = typeof showMessage === 'undefined' ? true : showMessage;
			this.state.login.status = 'LOGIN_STATUS_DISCONNECTING';
			this.updateState();
		}
	},

	onLogoutCompleted() {
		localStorage.token = '';
		// TODO:  Fix the logout result,
		//        for now we have 500 (Internal Server Error)
		debug('onLogoutCompleted', arguments);
		// TODO: this should be solved differently
		if (this.state.login.status !== 'LOGIN_STATUS_DISCONNECTED') {
			this.state.login.status = 'LOGIN_STATUS_DISCONNECTED';
			this.updateState();
		}
	},

	onLogoutFailed(errorMessage) {
		this.state.login.message = errorMessage;
		this.state.login.status = 'LOGIN_STATUS_DISCONNECT_FAILED';
		this.updateState();
	},

	// // Check
	// onCheck() {
	// 	this.state.login.status = 'LOGIN_STATUS_CHECKING';
	// 	this.updateState();
	// },

	// onCheckCompleted(isLogged) {
	// 	this.state.login.status = isLogged ? 'LOGIN_STATUS_CONNECTED' : 'LOGIN_STATUS_DISCONNECTED';
	// 	this.updateState();
	// },

	// onCheckFailed(errorMessage) {
	// 	this.state.login.message = errorMessage;
	// 	this.state.login.status = 'LOGIN_STATUS_CHECK_FAILED';
	// 	this.updateState();
	// },

	// Methods //

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = AuthStore;

'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
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
	onLoginCompleted() {
		this.state.login.status = 'LOGIN_STATUS_CONNECTED';
		this.updateState();
	},

	onLoginFailure(errorMessage) {
		this.state.login.message = errorMessage;
		this.state.login.status = 'LOGIN_STATUS_CONNECT_FAILED';
		this.updateState();
	},

	// Logout
	// onLogout(showMessage) {
	onLogout() {
		this.state.login.status = 'LOGIN_STATUS_DISCONNECTING';
		this.updateState();
	},

	onLogoutCompleted(showMessage) {
		debug('onLogoutCompleted', showMessage);
		this.state.login.showMessage = typeof showMessage === 'undefined' ? true : showMessage;
		this.state.login.status = 'LOGIN_STATUS_DISCONNECTED';
		this.updateState();
	},

	onLogoutFailure(errorMessage) {
		this.state.login.message = errorMessage;
		this.state.login.status = 'LOGIN_STATUS_DISCONNECT_FAILED';
		this.updateState();
	},

	// Check
	onCheck() {
		this.state.login.status = 'LOGIN_STATUS_CHECKING';
		this.updateState();
	},

	onCheckCompleted(isLogged) {
		this.state.login.status = isLogged ? 'LOGIN_STATUS_CONNECTED' : 'LOGIN_STATUS_DISCONNECTED';
		this.updateState();
	},

	onCheckFailure(errorMessage) {
		this.state.login.message = errorMessage;
		this.state.login.status = 'LOGIN_STATUS_CHECK_FAILED';
		this.updateState();
	},

	// Methods //

	// State update

	updateState() {
		this.trigger(this.state);
	}

});

module.exports = AuthStore;

'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debug = require('debug')('AiC:Stores:Websocket');

// APP
// const AppUtils = require('app/components/shared/app-utils');
const {WebsocketActions} = require('app/actions');

// Store
const WebsocketStore = Reflux.createStore({

	// Base Store //

	listenables: WebsocketActions,

	init() {
		this.state = {websocket: {}};
		this.updateState();
	},

	// Actions //

	// Connect
	onConnect() {
		debug('onConnect');
		this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECTING';
		this.updateState();
	},

	onConnectCompleted(token) {
		debug('onConnectCompleted', token);
		this.state.websocket.token = token;
		this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECTED';
		this.updateState();
	},

	onConnectFailure(errorMessage) {
		this.state.websocket.message = errorMessage;
		this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECT_FAILED';
		this.updateState();
	},

	// Close
	onClose() {
		this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSING';
		this.updateState();
	},

	onCloseCompleted() {
		this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSED';
		this.updateState();
	},

	onCloseFailure(errorMessage) {
		this.state.websocket.message = errorMessage;
		this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSE_FAILED';
		this.updateState();
	},

	// Message
	onMessage(message) {
		debug('received message', message);
		this.state.websocket.message = message;
		this.updateState();
	},

	// Error
	onError(errorMessage) {
		this.state.websocket.message = errorMessage;
		this.state.websocket.status = 'WEBSOCKET_STATUS_FAILED';
		this.updateState();
	},

	// Methods //

	// State update

	updateState() {
		this.trigger(this.state);
	}
});

module.exports = WebsocketStore;


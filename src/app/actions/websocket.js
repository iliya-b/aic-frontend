/* global SockJS */
'use strict';

// Reflux
const Reflux = require('reflux');

// Vendors
const debug = require('debug')('AiC:Actions:Websocket');

// APP
const BackendAPI = require('app/stores/backend-api');
const AppUtils = require('app/components/shared/app-utils');
const GobyActions = require('app/actions');

// Websocket
let GobyWebsocket;

// Actions
const loadedActions = {};

// Actions
const WebsocketActions = Reflux.createActions({
	connect: {children: ['completed', 'failure']},
	close: {children: ['completed', 'failure']},
	message: {},
	error: {}
});

// Listeners for asynchronous Backend API calls

WebsocketActions.connect.listen((token, service) => {
	let actionServiceName;

	debug('Trying to connect to Websocket', service);

	actionServiceName = service ? `${AppUtils.capitalize(service)}Actions` : null;

	if (service === undefined || service === '' || !GobyActions.hasOwnProperty(actionServiceName)) {
		console.error('You must inform a valid service for the websocket connection');
		return;
	}

	// Close previously opened websocket
	if (GobyWebsocket && typeof GobyWebsocket.close === 'function') {
		debug('Websocket closing prev');
		GobyWebsocket.close();
	}

	// Open new connection
	GobyWebsocket = new SockJS(`${BackendAPI.backendRoot()}/back/sock`);

	GobyWebsocket.gobyService = service;
	loadedActions[service] = GobyActions[actionServiceName];

	GobyWebsocket.onopen = function () {
		debug('websocket open');
		debug('sending token', token);
		GobyWebsocket.send(token);
		WebsocketActions.connect.completed(token);
	};

	GobyWebsocket.onmessage = function (e) {
		debug('websocket message', e.data, this);
		const res = JSON.parse(e.data);
		loadedActions[GobyWebsocket.gobyService].socketMessage(e);
		debug(res);
		// if (res.hasOwnProperty('message')) {
		//   switch( res.message ){
		//     case 'Stack created':
		//       LiveActions.liveCheck.completed(false);
		//       break;
		//     case 'Docker created':
		//       debug('docker created');
		//       LiveActions.liveStart.completed( res.data.vncip, res.data.vncport );
		//       LiveActions.liveConnect( res.data.vncip, res.data.vncport );
		//       break;
		//   }
		//   WebsocketActions.message(e.data);
		// }else if(res.hasOwnProperty('error')) {
		//   // TODO: is it going to be always liveCheck errors?
		//   LiveActions.liveCheck.failure(res.error);
		// }
	};

	GobyWebsocket.onerror = function (e) {
		debug('websocket error', e);
		WebsocketActions.error(e);
	};

	GobyWebsocket.onclose = function () {
		debug('websocket close');
		WebsocketActions.close.completed();
	};
});

// WebsocketActions.close.listen((token) => {
WebsocketActions.close.listen(() => {
	GobyWebsocket.close();
	// TODO: set timeout to check close websocket
});

module.exports = WebsocketActions;

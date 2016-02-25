/* global SockJS */
'use strict';

// Reflux
const Reflux = require('reflux');

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

	console.log('Trying to connect to Websocket', service);

	actionServiceName = service ? `${AppUtils.capitalize(service)}Actions` : null;

	if (service === undefined || service === '' || !GobyActions.hasOwnProperty(actionServiceName)) {
		console.error('You must inform a valid service for the websocket connection');
		return;
	}

	// Close previously opened websocket
	if (GobyWebsocket && typeof GobyWebsocket.close === 'function') {
		console.log('Websocket closing prev');
		GobyWebsocket.close();
	}

	// Open new connection
	GobyWebsocket = new SockJS(`${BackendAPI.backendRoot()}/back/sock`);

	GobyWebsocket.gobyService = service;
	loadedActions[service] = GobyActions[actionServiceName];

	GobyWebsocket.onopen = function () {
		console.log('websocket open');
		console.log('sending token', token);
		GobyWebsocket.send(token);
		WebsocketActions.connect.completed(token);
	};

	GobyWebsocket.onmessage = function (e) {
		console.log('websocket message', e.data, this);
		const res = JSON.parse(e.data);
		loadedActions[GobyWebsocket.gobyService].socketMessage(e);
		console.log(res);
		// if (res.hasOwnProperty('message')) {
		//   switch( res.message ){
		//     case 'Stack created':
		//       LiveActions.liveCheck.completed(false);
		//       break;
		//     case 'Docker created':
		//       console.log('docker created');
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
		console.log('websocket error', e);
		WebsocketActions.error(e);
	};

	GobyWebsocket.onclose = function () {
		console.log('websocket close');
		WebsocketActions.close.completed();
	};
});

// WebsocketActions.close.listen((token) => {
WebsocketActions.close.listen(() => {
	GobyWebsocket.close();
	// TODO: set timeout to check close websocket
});

module.exports = WebsocketActions;

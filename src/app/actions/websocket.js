'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { Auth } = require('goby/stores/auth.jsx');
var BackendAPI = require('goby/stores/backend-api.jsx');
var AppUtils = require('goby/components/shared/app-utils.jsx');
var GobyActions = require('goby/actions');

// Websocket
var GobyWebsocket;

// Actions
var loadedActions = {};

// Actions
var WebsocketActions = Reflux.createActions({
  'connect': { children: ["completed","failure"] },
  'close': { children: ["completed","failure"] },
  'message': {},
  'error': {},
});

// Listeners for asynchronous Backend API calls

WebsocketActions.connect.listen(function (token, service) {
  var actionServiceName;

  console.log('Trying to connect to Websocket', service);

  actionServiceName = service ? AppUtils.capitalize(service) + 'Actions' : null;

  if (service === undefined || service === '' || !GobyActions.hasOwnProperty(actionServiceName)){
    console.error('You must inform a valid service for the websocket connection');
    return;
  }

  // Close previously opened websocket
  if (GobyWebsocket && typeof GobyWebsocket.close === 'function' ){
    console.log('Websocket closing prev');
    GobyWebsocket.close();
  }

  // Open new connection
  GobyWebsocket = new SockJS(BackendAPI.backendRoot() + '/back/sock');

  GobyWebsocket.gobyService = service;
  loadedActions[service] = GobyActions[ actionServiceName ];

  GobyWebsocket.onopen = function() {
    console.log('websocket open');
    console.log('sending token', token);
    GobyWebsocket.send(token);
    WebsocketActions.connect.completed(token);
  };

  GobyWebsocket.onmessage = function(e) {
    console.log('websocket message', e.data , this);
    var res = JSON.parse(e.data);
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

  GobyWebsocket.onerror = function(e) {
    console.log('websocket error', e);
    WebsocketActions.error(e);
  };

  GobyWebsocket.onclose = function() {
    console.log('websocket close');
    WebsocketActions.close.completed();
  };

});

WebsocketActions.close.listen(function (token) {
  GobyWebsocket.close();
  // TODO: set timeout to check close websocket
});

module.exports = WebsocketActions;

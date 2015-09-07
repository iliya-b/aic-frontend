'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { Auth } = require('goby/stores/auth.jsx');
var BackendAPI = require('goby/stores/backend-api.jsx');

// Websocket
var GobyWebsocket;
// var GobyWebsocket = require('socket.io-client')(BackendAPI.backendRoot() + '/back/sock', { multiplex: false } );

// Actions
var WebsocketActions = Reflux.createActions({
  'connect': { children: ["completed","failure"] },
  'close': { children: ["completed","failure"] },
  'message': {},
  'error': {},
});

// Listeners for asynchronous Backend API calls

WebsocketActions.connect.listen(function (token) {

  console.log('Trying to connect to Websocket');

  GobyWebsocket = new SockJS(BackendAPI.backendRoot() + '/back/sock');

  GobyWebsocket.onopen = function() {
    console.log('websocket open');
    console.log('sending token', token);
    GobyWebsocket.send(token);
    WebsocketActions.connect.completed(token);
  };

  GobyWebsocket.onmessage = function(e) {
    var LiveActions = require('goby/actions/live.js');
    console.log('websocket message', e.data , this);
    var res = JSON.parse(e.data);
    console.log(res);
    if (res.hasOwnProperty('message')) {
      switch( res.message ){
        case 'Stack created':
          LiveActions.liveCheck.completed(false);
          break;
        case 'Docker created':
          console.log('docker created');
          LiveActions.liveStart.completed( res.data.vncip, res.data.vncport );
          LiveActions.liveConnect( res.data.vncip, res.data.vncport );
          break;
      }
      WebsocketActions.message(e.data);
    }else if(res.hasOwnProperty('error')) {
      // TODO: is it going to be always liveCheck errors?
      LiveActions.liveCheck.failure(res.error);
    }
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

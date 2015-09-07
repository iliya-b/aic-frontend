'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { WebsocketActions } = require('goby/actions');

// Store
var WebsocketStore =  Reflux.createStore({

  // Base Store //

  listenables: WebsocketActions,

  init: function() {
    this.state = { websocket: {} };
    this.updateState();
  },

  // Actions //

  // Connect
  onConnect: function () {
    console.log('onConnect');
    this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECTING';
    this.updateState();
  },

  onConnectCompleted: function (token) {
    console.log('onConnectCompleted', token);
    this.state.websocket.token = token;
    this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECTED';
    this.updateState();
  },

  onConnectFailure: function (errorMessage) {
    this.state.websocket.message = errorMessage;
    this.state.websocket.status = 'WEBSOCKET_STATUS_CONNECT_FAILED';
    this.updateState();
  },

  // Close
  onClose: function () {
    this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSING';
    this.updateState();
  },

  onCloseCompleted: function () {
    this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSED';
    this.updateState();
  },

  onCloseFailure: function (errorMessage) {
    this.state.websocket.message = errorMessage;
    this.state.websocket.status = 'WEBSOCKET_STATUS_CLOSE_FAILED';
    this.updateState();
  },

  // Message
  onMessage: function (message) {
    console.log('received message', message);
    this.state.websocket.message = message;
    this.updateState();
  },

  // Error
  onError: function (errorMessage) {
    this.state.websocket.message = errorMessage;
    this.state.websocket.status = 'WEBSOCKET_STATUS_FAILED';
    this.updateState();
  },

  // Methods //


  // State update

  updateState: function(){
    this.trigger( this.state );
  },



});


module.exports = WebsocketStore;


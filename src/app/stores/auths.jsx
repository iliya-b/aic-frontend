'use strict';

// Reflux
var Reflux = require('reflux');

// APP
// var AppUtils = require('goby/components/shared/app-utils.jsx');
var { AuthActions } = require('goby/actions');

// Store
var AuthStore =  Reflux.createStore({

  // Base Store //

  listenables: AuthActions,

  init: function() {
    this.state = { login:{} };
    this.updateState();
  },

  // Actions //

  // Login
  onLogin: function () {
    this.state.login.status = 'LOGIN_STATUS_CONNECTING';
    this.updateState();
  },

  onLoginCompleted: function (message) {
    console.log('onLoginCompleted', message);
    this.state.login.status = 'LOGIN_STATUS_CONNECTED';
    this.updateState();
  },

  onLoginFailure: function (errorMessage) {
    this.state.login.message = errorMessage;
    this.state.login.status = 'LOGIN_STATUS_CONNECT_FAILED';
    this.updateState();
  },

  // Logout
  onLogout: function () {
    this.state.login.status = 'LOGIN_STATUS_DISCONNECTING';
    this.updateState();
  },

  onLogoutCompleted: function () {
    this.state.login.status = 'LOGIN_STATUS_DISCONNECTED';
    this.updateState();
  },

  onLogoutFailure: function (errorMessage) {
    this.state.login.message = errorMessage;
    this.state.login.status = 'LOGIN_STATUS_DISCONNECT_FAILED';
    this.updateState();
  },

  // Methods //


  // State update

  updateState: function(){
    this.trigger( this.state );
  },



});


module.exports = AuthStore;


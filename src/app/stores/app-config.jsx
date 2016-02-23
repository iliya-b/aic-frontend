'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debuggerGoby = require('debug')('AiC:Store:AppConfig');

// APP
const {AppConfigActions} = require('app/actions');

// Store
const AppConfigStore = Reflux.createStore({

   // Base Store //

  listenables: AppConfigActions,

  init() {
    this.state = {};
    this.state.config = {};
  },

  // Actions //

  onLoad() {
    //
  },

  onLoadCompleted(data) {
    debuggerGoby('onLoadCompleted', data);
    this.state.config = data;
    this.state.config.isLoaded = true;
    this.state.config.hasErrors = false;
    this.updateState();
  },

  onLoadFailure(error) {
    debuggerGoby('onLoadFailure', error);
    this.state.config.isLoaded = true;
    this.state.config.hasErrors = true;
    this.state.config.error = error;
    this.updateState();
  },

  // Methods //

  updateState() {
    this.trigger(this.state);
  },

});

module.exports = AppConfigStore;

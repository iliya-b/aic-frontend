'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debuggerGoby = require('debug')('AiC:LiveList:Store');

// APP
const {LiveListActions} = require('app/actions');

// Store
const LiveListStore = Reflux.createStore({

  // Base Store //

  listenables: LiveListActions,

  init() {
    this.state = {
      live: {},
    };
    this.state.live.status = 'LIVE_STATUS_INITIATING';
    this.updateState();
  },

  // Actions //

  // Live list
  onList() {
    debuggerGoby('onlist');
    this.state.live.status = 'LIVE_STATUS_LISTING';
    this.updateState();
  },

  onListCompleted(avms) {
    this.state.live.avms = avms;
    this.state.live.status = 'LIVE_STATUS_LISTED';
    this.updateState();
  },

  onListFailure(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_LIST_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Methods //

  // State update

  updateState() {
    this.trigger(this.state);
  },

});

module.exports = LiveListStore;


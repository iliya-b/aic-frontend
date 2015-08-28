'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { CampaignActions } = require('goby/actions');

// Store
var CampaignStore =  Reflux.createStore({

  // Base Store //

  listenables: CampaignActions,

  init: function() {
    this.state = {};
    this.state.projectId = false;
    this.reset();
    this.state.campaign.status = 'CAMPAIGN_STATUS_INITIATING';
    this.updateState();
  },

  // Actions //

  // Set project
  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.state.campaign.status = 'CAMPAIGN_STATUS_PREPARING';
    this.updateState();
  },

  onLoadState: function () {
    this.updateState();
  },

  onSetState: function (newState) {
    this.state = newState;
    this.updateState();
  },


  // Methods //


  // Status Box

  reset: function () {
    this.state.campaign = {};
    this.resetBoxes();
  },

  resetBoxes: function() {
    this.state.campaign.boxes = [
      { typeName: 'prepare', status: 'disable', enabled: true, isFirst: true },
      { typeName: 'create', status: 'disable', enabled: true, objectName:'campaign' },
      { typeName: 'run', status: 'disable', enabled: true },
      { typeName: 'result', status: 'disable', enabled: true, isLast: true },
    ];
  },

  changeBoxes: function (typeName, field, newValue) {
    // console.log(this.state);
    console.log(arguments);
    var replacement = {};
    replacement[field] = newValue;
    this.state.campaign.boxes = this.state.campaign.boxes.map(
      function(item) {
        return item.typeName === typeName ? AppUtils.extend(item, replacement) : item ;
      }
    );
  },

  statusUpdating: {
    'CAMPAIGN_STATUS_INITIATING':   { typeName: '', newStatus: '' },

    'CAMPAIGN_STATUS_PREPARING':     { typeName: 'prepare', newStatus: 'doing'},
    'LIVE_STATUS_CHECK_FOUND':  { typeName: 'search', newStatus: 'success'},
    'LIVE_STATUS_CHECK_NOTFOUND':{ typeName: 'search', newStatus: 'not-found'},
    'LIVE_STATUS_CHECK_FAILED': { typeName: 'search', newStatus: 'fail'},

    'LIVE_STATUS_LOADING':      { typeName: 'load',   newStatus: 'doing'},
    'LIVE_STATUS_LOADED':       { typeName: 'load',   newStatus: 'success'},
    'LIVE_STATUS_LOAD_FAILED':  { typeName: 'load',   newStatus: 'fail'},

    'LIVE_STATUS_STARTING':     { typeName: 'create',   newStatus: 'doing'},
    'LIVE_STATUS_STARTED':      { typeName: 'create',   newStatus: 'success'},
    'LIVE_STATUS_START_FAILED': { typeName: 'create',   newStatus: 'fail'},

    'LIVE_STATUS_CONNECTING':     { typeName: 'connect',   newStatus: 'doing'},
    'LIVE_STATUS_CONNECTED':      { typeName: 'connect',   newStatus: 'success'},
    'LIVE_STATUS_CONNECT_FAILED': { typeName: 'connect',   newStatus: 'fail'},

    'LIVE_STATUS_STOPPING':     { typeName: 'close',  newStatus: 'doing'},
    'LIVE_STATUS_STOPPED':      { typeName: 'close',  newStatus: 'success'},
    'LIVE_STATUS_STOP_FAILED':  { typeName: 'close',  newStatus: 'fail'},

    'LIVE_STATUS_RESET':          { typeName: '', newStatus: '' },
  },

  // State update

  updateState: function(){
    var actualStatus = this.statusUpdating[this.state.campaign.status];
    this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
    this.trigger( this.state );
  },



});


module.exports = CampaignStore;


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
    this.onLogMessage('Initiating campaign.');
    this.updateState();
  },

  // Actions //

  // Set project
  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.setPreparing();
  },

  onLoadState: function () {
    this.updateState();
  },

  onSetState: function (newState) {
    this.state = newState;
    this.updateState();
  },

  // Restart
  onRestart: function (projectId) {
    this.onLogMessage('Restarting campaign.');
    this.reset();
    this.setPreparing();
  },

  setPreparing: function () {
    this.onLogMessage('Preparing campaign.');
    this.state.campaign.status = 'CAMPAIGN_STATUS_PREPARING';
    this.updateState();
  },

  // Create

  onCreate: function(){
    this.onLogMessage('Campaign prepared.');
    this.state.campaign.status = 'CAMPAIGN_STATUS_PREPARED';
    this.updateState();
    this.onLogMessage('Creating campaign.');
    this.state.campaign.status = 'CAMPAIGN_STATUS_CREATING';
    this.updateState();
  },

  onCreateCompleted: function(){
    this.onLogMessage('Creating created.');
    this.state.campaign.status = 'CAMPAIGN_STATUS_CREATED';
    this.updateState();
  },

  onCreateFailure: function(errorMessage){
    this.onLogMessage(errorMessage);
    this.state.campaign.status = 'CAMPAIGN_STATUS_CREATE_FAILED';
    this.state.campaign.message = errorMessage;
    this.updateState();
  },

  // SocketMessage
  onSocketMessage: function (message) {
    var messageParsed = JSON.parse(message.data);
    console.log('onSocketMessage', messageParsed);
    if (messageParsed.hasOwnProperty('message')) {
      this.onLogMessage(messageParsed.message);
      switch( messageParsed.message ){
        case 'Stack retrieval or creation finished':

          break;
        case 'Docker created and ready.':
          CampaignActions.create.completed();
          CampaignActions.run();
          break;
        case 'Test packages list received, instrumentation started':
          CampaignActions.run.completed();
          CampaignActions.result();
          break;
        case 'Tests ran':
          CampaignActions.result.completed(messageParsed.data.testSuites);
      }
    }else if(messageParsed.hasOwnProperty('error')) {

      switch( this.state.campaign.status ){
        case 'CAMPAIGN_STATUS_CREATING':
          CampaignActions.create.failure(messageParsed.error);
          break;
        case 'CAMPAIGN_STATUS_RUNNING':
          CampaignActions.run.failure(messageParsed.error);
          break;
        case 'CAMPAIGN_STATUS_RESULTING':
          CampaignActions.result.failure(messageParsed.error);
          break;
        default:
          console.error('campaign error not treated', messageParsed.error);
          break;
      }

    }
  },

  // Load Devices

  onLoadDevices: function(){
  },

  onLoadDevicesCompleted: function(devices){
    this.state.availableDevices = devices;
    this.updateState();
  },

  onLoadDevicesFailure: function(errorMessage){
    this.onLogMessage(errorMessage);
    throw 'error'; // TODO: failure
  },

  // Run

  onRun: function(){
    this.state.campaign.status = 'CAMPAIGN_STATUS_RUNNING';
    this.updateState();
  },

  onRunCompleted: function(){
    this.state.campaign.status = 'CAMPAIGN_STATUS_RAN';
    this.updateState();
  },

  onRunFailure: function(errorMessage){
    this.onLogMessage(errorMessage);
    this.state.campaign.status = 'CAMPAIGN_STATUS_RUN_FAILED';
    this.state.campaign.message = errorMessage;
    this.updateState();
  },

  // Result

  onResult: function(){
    this.state.campaign.status = 'CAMPAIGN_STATUS_RESULTING';
    this.updateState();
  },

  onResultCompleted: function(results){
    this.state.campaign.results = results;
    this.state.campaign.status = 'CAMPAIGN_STATUS_RESULTED';
    this.updateState();
  },

  onResultFailure: function(errorMessage){
    this.onLogMessage(errorMessage);
    this.state.campaign.status = 'CAMPAIGN_STATUS_RESULT_FAILED';
    this.state.campaign.message = errorMessage;
    this.updateState();
  },

  // Log Message

  onLogMessage: function (message) {
    this.state.campaign.logBox.unshift({ time: AppUtils.getDate() , message: message });
  },

  // Methods //


  // Status Box

  reset: function () {
    this.state.campaign = {};
    this.state.campaign.logBox = [];
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
    // console.log(arguments);
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
    'CAMPAIGN_STATUS_PREPARED':     { typeName: 'prepare', newStatus: 'success'},
    'CAMPAIGN_STATUS_PREPARE_FAILED':     { typeName: 'prepare', newStatus: 'fail'},

    'CAMPAIGN_STATUS_CREATING':     { typeName: 'create',   newStatus: 'doing'},
    'CAMPAIGN_STATUS_CREATED':      { typeName: 'create',   newStatus: 'success'},
    'CAMPAIGN_STATUS_CREATE_FAILED': { typeName: 'create',   newStatus: 'fail'},

    'CAMPAIGN_STATUS_RUNNING':     { typeName: 'run',   newStatus: 'doing'},
    'CAMPAIGN_STATUS_RAN':      { typeName: 'run',   newStatus: 'success'},
    'CAMPAIGN_STATUS_RUN_FAILED': { typeName: 'run',   newStatus: 'fail'},

    'CAMPAIGN_STATUS_RESULTING':     { typeName: 'result',   newStatus: 'doing'},
    'CAMPAIGN_STATUS_RESULTED':      { typeName: 'result',   newStatus: 'success'},
    'CAMPAIGN_STATUS_RESULT_FAILED': { typeName: 'result',   newStatus: 'fail'},

    'CAMPAIGN_STATUS_RESET':          { typeName: '', newStatus: '' },
  },

  // State update

  updateState: function(){
    // console.log('updateState');
    // console.log(this.state.campaign.status);
    var actualStatus = this.statusUpdating[this.state.campaign.status];
    this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
    this.trigger( this.state );
  },



});


module.exports = CampaignStore;


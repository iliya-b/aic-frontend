'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var AppUtils = require('goby/components/shared/app-utils.jsx');
var { LiveActions } = require('goby/actions');

// Store
var LiveStore =  Reflux.createStore({

  // Base Store //

  listenables: LiveActions,

  init: function() {
    this.state = {};
    this.state.projectId = false;
    this.resetLive();
    this.state.live.status = 'LIVE_STATUS_INITIATING';
    this.updateState();
  },

  // Actions //

  // Set project
  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.updateState();
  },

  onSetProjectIdCompleted: function () {
    this.state.live.status = 'LIVE_STATUS_INITIALIZED';
    this.updateState();
  },

  onSetProjectIdFailure: function (errorMessage) {
    this.state.live.message = errorMessage;
    this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
    this.updateState();
  },

  onLoadState: function () {
    this.updateState();
  },

  onSetState: function (newState) {
    this.state = newState;
    this.updateState();
  },

  onLiveReset: function () {
    this.resetLive();
    this.state.live.status = 'LIVE_STATUS_RESET';
    this.updateState();
  },

  // Live check
  onLiveCheck: function(){
    this.addLogMessage('Searching session.');
    this.state.live.status = 'LIVE_STATUS_CHECKING';
    this.updateState();
  },

  onLiveCheckCompleted: function(sessionFound){
    this.state.live.sessionFound = sessionFound;
    this.state.live.status = sessionFound ? 'LIVE_STATUS_CHECK_FOUND' : 'LIVE_STATUS_CHECK_NOTFOUND';
    this.changeBoxes('load', 'enabled', sessionFound);
    this.changeBoxes('create', 'enabled', !sessionFound);
    this.updateState();
  },

  onLiveCheckFailure: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_CHECK_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live start
  onLiveStart: function(){
    this.state.live.status = 'LIVE_STATUS_STARTING';
    this.updateState();
  },

  onLiveStartCompleted: function(screenIP, screenPort){
    this.state.live.screen.ip = screenIP;
    this.state.live.screen.port = screenPort;
    this.state.live.screen.rotation = 'horizontal';
    this.state.live.delayedRotation = 'horizontal';
    this.state.live.status = 'LIVE_STATUS_STARTED';
    this.updateState();
  },

  onLiveStartFailure: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_START_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live connect
  onLiveConnect: function(vmhost, vmport){
    this.state.live.status = 'LIVE_STATUS_CONNECTING';
    this.updateState();
    LiveActions.tryAudioConnection( vmhost, vmport+1000, (res) => {});
  },

  onLiveConnectCompleted: function(){
    this.state.live.status = 'LIVE_STATUS_CONNECTED';
    this.updateState();
  },

  onLiveConnectFailure: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_CONNECT_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live stop
  onLiveStop: function(){
    this.state.live.status = 'LIVE_STATUS_STOPPING';
    this.updateState();
  },

  onLiveStopCompleted: function(){
    this.resetMachine();
    this.state.live.status = 'LIVE_STATUS_STOPPED';
    this.updateState();
  },

  onLiveStopFailed: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_STOP_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live sensors

  onSetSensorBattery: function (projectId, value) {
    this.state.live.battery = value;
  },

  onSetSensorAccelerometer: function (projectId, x, y, z, newRotationName) {
    this.state.live.screen.rotation = newRotationName;
    this.updateState();
  },

  onSetDelayedRotation: function(){
    this.state.live.delayedRotation = this.state.live.screen.rotation;
    this.updateState();
  },

  onRecordStart: function(){
    this.state.live.recording = true;
    this.updateState();
  },

  onRecordStartCompleted: function(filename){
    this.state.live.recording = true;
    this.state.live.recordingFileName = filename;
    this.updateState();
  },

  onRecordStop: function(){
    this.state.live.recording = false;
    this.updateState();
  },

  // Socket Message
  onSocketMessage: function (message) {
    var messageParsed = JSON.parse(message.data);
    console.log('onSocketMessage', messageParsed);
    if (messageParsed.hasOwnProperty('message')) {
      this.addLogMessage(messageParsed.message);
      switch( messageParsed.message ){
        case 'Stack retrieval or creation finished':
          LiveActions.liveCheck.completed(false);
          LiveActions.liveStart();
          break;
        case 'Docker created and ready.':
          console.log('docker created');
          LiveActions.liveStart.completed( messageParsed.data.vncip, messageParsed.data.vncport );
          LiveActions.liveConnect( messageParsed.data.vncip, messageParsed.data.vncport );
          break;
      }
    }else if(messageParsed.hasOwnProperty('error')) {

      switch( this.state.live.status ){
        case 'LIVE_STATUS_CHECKING':
          LiveActions.liveCheck.failure(messageParsed.error);
          break;
        case 'LIVE_STATUS_STARTING':
          LiveActions.liveStart.failure(messageParsed.error);
          break;
      }
    }
  },

  onLogMessage: function (message) {
    this.addLogMessage(message);
  },

  // Methods //


  // Status Box

  resetMachine: function () {
    this.state.live.screen.ip = null;
    this.state.live.screen.port = null;
    this.state.live.screen.rotation = null;
    this.state.live.delayedRotation = null;
    this.state.live.battery = 100;
  },

  resetLive: function () {
    this.state.live = {};
    this.state.live.logBox = [];
    this.state.live.screen = {}
    this.resetMachine();
    this.state.live.recording = false;
    this.state.live.rotationSets = {
      horizontal: { x: 0, y: 5.9, z: 0, next: 'vertical'},
      vertical:   { x: 5.9, y: 0, z: 0, next: 'horizontal'},
    };
    this.state.live.recordingFileName = '';
    this.resetBoxes();
  },

  resetBoxes: function() {
    this.state.live.boxes = [
      { typeName: 'search', status: 'disable', enabled: true, isFirst: true },
      { typeName: 'create', status: 'disable', enabled: false },
      { typeName: 'load', status: 'disable', enabled: true },
      { typeName: 'connect', status: 'disable', enabled: true },
      { typeName: 'close', status: 'disable', enabled: true, isLast: true },
    ];
  },

  changeBoxes: function (typeName, field, newValue) {
    // console.log(this.state);
    // console.log(arguments);
    var replacement = {};
    replacement[field] = newValue;
    this.state.live.boxes = this.state.live.boxes.map(
      function(item) {
        return item.typeName === typeName ? AppUtils.extend(item, replacement) : item ;
      }
    );
  },

  addLogMessage: function(message){
    this.state.live.logBox.unshift({ time: AppUtils.getDate() , message: message });
  },

  statusUpdating: {
    'LIVE_STATUS_INITIATING':   { typeName: '', newStatus: '' },
    'LIVE_STATUS_INITIALIZED':  { typeName: '', newStatus: ''},
    'LIVE_STATUS_INITIAL_FAILED':  { typeName: '', newStatus: ''},

    'LIVE_STATUS_CHECKING':     { typeName: 'search', newStatus: 'doing'},
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
    var actualStatus = this.statusUpdating[this.state.live.status];
    this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
    this.trigger( this.state );
  },



});


module.exports = LiveStore;


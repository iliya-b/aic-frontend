'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debuggerGoby = require('debug')('AiC:Live:Store');

// APP
const AppUtils = require('goby/components/shared/app-utils.jsx');
const {LiveActions} = require('goby/actions');

// Store
const LiveStore = Reflux.createStore({

  // Base Store //

  listenables: LiveActions,

  init() {
    this.state = {};
    this.state.projectId = false;
    this.resetLive();
    this.state.live.status = 'LIVE_STATUS_INITIATING';
    this.updateState();
  },

  // Actions //

  // Set project
  onSetProjectId(projectId) {
    this.state.projectId = projectId;
    this.updateState();
  },

  onSetProjectIdCompleted() {
    this.state.live.status = 'LIVE_STATUS_INITIALIZED';
    this.updateState();
  },

  onSetProjectIdFailure(errorMessage) {
    this.state.live.message = errorMessage;
    this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
    this.updateState();
  },

  // Load info
  onLoadInfo() {
    // this.updateState();
  },

  onLoadInfoCompleted(avmInfo) {
    // avmInfo.avm_novnc_host
    LiveActions.liveConnect(window.GobyAppGlobals.config.backend.host, avmInfo.avm_novnc_port);
  },

  onLoadInfoFailure(errorMessage) {
    this.state.live.message = errorMessage;
    this.state.live.status = 'LIVE_STATUS_INITIAL_FAILED';
    this.updateState();
  },

  // Load State
  onLoadState() {
    this.updateState();
  },

  onSetState(newState) {
    this.state = newState;
    this.updateState();
  },

  onLiveReset() {
    this.resetLive();
    this.state.live.status = 'LIVE_STATUS_RESET';
    this.updateState();
  },

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

  // Live list
  onStart() {
    this.state.live.status = 'LIVE_STATUS_VMSTARTING';
    this.updateState();
  },

  onStartCompleted(avm) {
    this.state.live.avm = avm;
    this.state.live.status = 'LIVE_STATUS_VMSTARTED';
    this.updateState();
  },

  onStartFailure(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_VMSTART_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live check
  onLiveCheck() {
    this.addLogMessage('Searching session.');
    this.state.live.status = 'LIVE_STATUS_CHECKING';
    this.updateState();
  },

  onLiveCheckCompleted(sessionFound) {
    this.state.live.sessionFound = sessionFound;
    this.state.live.status = sessionFound ? 'LIVE_STATUS_CHECK_FOUND' : 'LIVE_STATUS_CHECK_NOTFOUND';
    this.changeBoxes('load', 'enabled', sessionFound);
    this.changeBoxes('create', 'enabled', !sessionFound);
    this.updateState();
  },

  onLiveCheckFailure(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_CHECK_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live start
  onLiveStart() {
    this.state.live.status = 'LIVE_STATUS_STARTING';
    this.updateState();
  },

  onLiveStartCompleted(screenIP, screenPort) {
    this.state.live.screen.ip = screenIP;
    this.state.live.screen.port = screenPort;
    this.state.live.screen.rotation = 'horizontal';
    this.state.live.delayedRotation = 'horizontal';
    this.state.live.status = 'LIVE_STATUS_STARTED';
    this.updateState();
  },

  onLiveStartFailure(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_START_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live connect
  onLiveConnect(vmhost, vmport) {
    this.state.live.status = 'LIVE_STATUS_CONNECTING';
    this.updateState();
    LiveActions.tryAudioConnection( vmhost, vmport+1000, (res) => {});
  },

  onLiveConnectCompleted() {
    this.state.live.status = 'LIVE_STATUS_CONNECTED';
    this.updateState();
  },

  onLiveConnectFailure(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_CONNECT_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live stop
  onLiveStop() {
    this.state.live.status = 'LIVE_STATUS_STOPPING';
    this.updateState();
  },

  onLiveStopCompleted() {
    this.resetMachine();
    this.state.live.status = 'LIVE_STATUS_STOPPED';
    this.updateState();
  },

  onLiveStopFailed(errorMessage) {
    this.state.live.status = 'LIVE_STATUS_STOP_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live sensors

  onSetSensorBattery(projectId, value) {
    this.state.live.battery = value;
  },

  onSetSensorAccelerometer(projectId, x, y, z, newRotationName) {
    this.state.live.screen.rotation = newRotationName;
    this.updateState();
  },

  onSetDelayedRotation() {
    this.state.live.delayedRotation = this.state.live.screen.rotation;
    this.updateState();
  },

  onRecordStart() {
    this.state.live.recording = true;
    this.updateState();
  },

  onRecordStartCompleted(filename) {
    this.state.live.recording = true;
    this.state.live.recordingFileName = filename;
    this.updateState();
  },

  onRecordStop() {
    this.state.live.recording = false;
    this.updateState();
  },

  // Socket Message
  onSocketMessage(message) {
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

  onLogMessage(message) {
    this.addLogMessage(message);
  },

  // Methods //

  // Status Box

  resetMachine() {
    this.state.live.screen.ip = null;
    this.state.live.screen.port = null;
    this.state.live.screen.rotation = null;
    this.state.live.delayedRotation = null;
    this.state.live.battery = 100;
  },

  resetLive() {
    this.state.live = {};
    this.state.live.logBox = [];
    this.state.live.screen = {};
    this.resetMachine();
    this.state.live.recording = false;
    this.state.live.rotationSets = {
      horizontal: {x: 0, y: 5.9, z: 0, next: 'vertical'},
      vertical: {x: 5.9, y: 0, z: 0, next: 'horizontal'},
    };
    this.state.live.recordingFileName = '';
    this.resetBoxes();
  },

  resetBoxes() {
    this.state.live.boxes = [
      {typeName: 'search', status: 'disable', enabled: true, isFirst: true},
      {typeName: 'create', status: 'disable', enabled: false},
      {typeName: 'load', status: 'disable', enabled: true},
      {typeName: 'connect', status: 'disable', enabled: true},
      {typeName: 'close', status: 'disable', enabled: true, isLast: true},
    ];
  },

  changeBoxes(typeName, field, newValue) {
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

  addLogMessage(message) {
    this.state.live.logBox.unshift({time: AppUtils.getDate(), message});
  },

  statusUpdating: {
    LIVE_STATUS_INITIATING: {typeName: '', newStatus: ''},
    LIVE_STATUS_INITIALIZED: {typeName: '', newStatus: ''},
    LIVE_STATUS_INITIAL_FAILED: {typeName: '', newStatus: ''},

    LIVE_STATUS_LISTING: {typeName: 'list', newStatus: 'doing'},
    LIVE_STATUS_LISTED: {typeName: 'list', newStatus: 'success'},
    LIVE_STATUS_LIST_FAILED: {typeName: 'list', newStatus: 'fail'},

    LIVE_STATUS_VMSTARTING: {typeName: 'vmstart', newStatus: 'doing'},
    LIVE_STATUS_VMSTARTED: {typeName: 'vmstart', newStatus: 'success'},
    LIVE_STATUS_VMSTART_FAILED: {typeName: 'vmstart', newStatus: 'fail'},

    LIVE_STATUS_CHECKING: {typeName: 'search', newStatus: 'doing'},
    LIVE_STATUS_CHECK_FOUND: {typeName: 'search', newStatus: 'success'},
    LIVE_STATUS_CHECK_NOTFOUND: {typeName: 'search', newStatus: 'not-found'},
    LIVE_STATUS_CHECK_FAILED: {typeName: 'search', newStatus: 'fail'},

    LIVE_STATUS_LOADING: {typeName: 'load', newStatus: 'doing'},
    LIVE_STATUS_LOADED: {typeName: 'load', newStatus: 'success'},
    LIVE_STATUS_LOAD_FAILED: {typeName: 'load', newStatus: 'fail'},

    LIVE_STATUS_STARTING: {typeName: 'create', newStatus: 'doing'},
    LIVE_STATUS_STARTED: {typeName: 'create', newStatus: 'success'},
    LIVE_STATUS_START_FAILED: {typeName: 'create', newStatus: 'fail'},

    LIVE_STATUS_CONNECTING: {typeName: 'connect', newStatus: 'doing'},
    LIVE_STATUS_CONNECTED: {typeName: 'connect', newStatus: 'success'},
    LIVE_STATUS_CONNECT_FAILED: {typeName: 'connect', newStatus: 'fail'},

    LIVE_STATUS_STOPPING: {typeName: 'close', newStatus: 'doing'},
    LIVE_STATUS_STOPPED: {typeName: 'close', newStatus: 'success'},
    LIVE_STATUS_STOP_FAILED: {typeName: 'close', newStatus: 'fail'},

    LIVE_STATUS_RESET: {typeName: '', newStatus: ''},
  },

  // State update

  updateState() {
    var actualStatus = this.statusUpdating[this.state.live.status];
    this.changeBoxes(actualStatus.typeName, 'status', actualStatus.newStatus);
    this.trigger( this.state );
  },

});

module.exports = LiveStore;

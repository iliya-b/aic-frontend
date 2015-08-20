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
    this.state.live = {};
    this.state.live.status = 'LIVE_STATUS_INITIATING';
    this.state.live.screen = {}
    this.state.live.screen.ip = null;
    this.state.live.screen.port = null;
    this.state.live.screen.rotation = null;
    this.state.live.delayedRotation = null;
    this.state.live.recording = false;
    this.state.live.rotationSets = {
      horizontal: { x: 0, y: 5.9, z: 0, next: 'vertical'},
      vertical:   { x: 5.9, y: 0, z: 0, next: 'horizontal'},
    };
    this.state.live.recordingFileName = '';
  },

  // Actions //

  // Set project
  onSetProjectId: function (projectId) {
    this.state.projectId = projectId;
    this.state.live.status = 'LIVE_STATUS_INITIALIZED';
    this.updateState();
  },

  onLoadState: function () {
    this.updateState();
  },

  onSetState: function (newState) {
    this.state = newState;
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

  onLiveStartFailed: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
  },

  // Live stop
  onLiveStop: function(){
    this.state.live.status = 'LIVE_STATUS_STOPPING';
    this.updateState();
  },

  onLiveStopCompleted: function(){
    this.state.live.screen.ip = null;
    this.state.live.screen.port = null;
    this.state.live.screen.rotation = null;
    this.state.live.delayedRotation = null;
    this.state.live.status = 'LIVE_STATUS_STOPPED';
    this.updateState();
  },

  onLiveStopFailed: function(errorMessage){
    this.state.live.status = 'LIVE_STATUS_FAILED';
    this.state.live.message = errorMessage;
    this.updateState();
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

  // Methods //

  updateState: function(){
    this.trigger( this.state );
  },



});


module.exports = LiveStore;


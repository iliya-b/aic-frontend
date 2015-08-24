'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { Auth } = require('goby/stores/auth.jsx');
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var LiveActions = Reflux.createActions({
  'setProjectId': {},
  'loadState': {},
  'setState': {},
  'setDelayedRotation': {},
  'liveCheck': {asyncResult: true},
  'liveStart': {asyncResult: true},
  'liveStop': {asyncResult: true},
  'setSensorBattery': {asyncResult: true},
  'setSensorAccelerometer': {asyncResult: true},
  'setSensorLocation': {asyncResult: true},
  'recordStart': {asyncResult: true},
  'recordStop': {asyncResult: true},
  'screenshot': {asyncResult: true},
});

// Listeners for asynchronous Backend API calls

LiveActions.liveCheck.listen(function () {
  var token = Auth.getToken();
  BackendAPI.liveCheck(token, (res) => {
    this.completed( res );
  });
});

LiveActions.liveStart.listen(function () {
  var token = Auth.getToken();
  BackendAPI.liveStart(token, (res) => {
    this.completed( res.vncip, res.vncport );
  });
});

LiveActions.liveStop.listen(function (screenPort) {
  var token = Auth.getToken();
  BackendAPI.liveStop(token, screenPort, (res) => {
    this.completed( res );
  });
});

LiveActions.setSensorBattery.listen(function (projectId, value) {
  var token = Auth.getToken();
  BackendAPI.sensorBattery(token, projectId, value, (res) => {
    this.completed( res );
  });
});

LiveActions.setSensorAccelerometer.listen(function (projectId, x, y, z) {
  var token = Auth.getToken();
  BackendAPI.sensorAccelerometer(token, projectId, x, y, z, (res) => {
    this.completed( res );
  });
});

LiveActions.setSensorLocation.listen(function (projectId, lat, lon) {
  var token = Auth.getToken();
  BackendAPI.sensorLocation(token, projectId, lat, lon, (res) => {
    this.completed( res );
  });
});

LiveActions.recordStart.listen(function (projectId) {
  var token = Auth.getToken();
  var filename = this.createVideoName();
  BackendAPI.recordingStart(token, projectId, filename, (res) => {
    res.filename = filename;
    this.completed( res );
  });
});

LiveActions.recordStop.listen(function (projectId, filename) {
  var token = Auth.getToken();
  BackendAPI.recordingStop(token, projectId, filename, (res) => {
    this.completed( res );
  });
});

LiveActions.screenshot.listen(function (projectId, filename) {
  var token = Auth.getToken();
  var filename = this.createImageName();
  BackendAPI.screenshot(token, projectId, filename, (res) => {
    this.completed( res );
  });
});

LiveActions.createFileName = function (beginWith, endWith) {
  return beginWith + Date.now() + endWith;
};

LiveActions.createVideoName = function () {
  return this.createFileName('video','.mp4');
};

LiveActions.createImageName = function () {
  return this.createFileName('snap','.bmp');
};


module.exports = LiveActions;

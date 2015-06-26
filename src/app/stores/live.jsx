'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var Live = {

  /* Battery */
  setBattery: function (projectId, value, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorBattery(token, projectId, value, (res) => {
      cb(res);
    });
  },

  /**/

  rotation: {
    started: false,
    sets: {
      horizontal: { x: 0, y: 5.9, z: 0, next: 'vertical'},
      vertical:   { x: 5.9, y: 0, z: 0, next: 'horizontal'},
    },
    initial: 'horizontal',
    last: 'horizontal'
  },



  setAccelerometer: function (projectId, x, y, z, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorAccelerometer(token, projectId, x, y, z, (res) => {
      cb(res);
    });
  },

  flipRotation: function (projectId, cb) {
    var nextRotation, lastRotation;
    lastRotation = this.rotation.sets[this.rotation.last];
    var nextRotation = this.rotation.sets[lastRotation.next];
    this.rotation.last = lastRotation.next;
    this.setAccelerometer(projectId, nextRotation.x, nextRotation.y, nextRotation.z, (res) => {
      cb(res);
    });
  },

  getRotation: function () {
    return this.rotation.last;
  },


  setLocation: function (projectId, lat, lon, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorLocation(token, projectId, lat, lon, (res) => {
      cb(res);
    });
  },


  createFileName: function (beginWith, endWith) {
    return beginWith + Date.now() + endWith;
  },

  createVideoName: function () {
    return this.createFileName('video','.mp4');
  },

  createImageName: function () {
    return this.createFileName('snap','.bmp');
  },

  recordingStart: function (projectId, cb) {
    var token = Auth.getToken();
    var filename = this.createVideoName();
    BackendAPI.recordingStart(token, projectId, filename, (res) => {
      res.filename = filename;
      cb(res);
    });
  },

  recordingStop: function (projectId, filename, cb) {
    var token = Auth.getToken();
    BackendAPI.recordingStop(token, projectId, filename, (res) => {
      cb(res);
    });
  },

  screenshot: function (projectId, cb) {
    var token = Auth.getToken();
    var filename = this.createImageName();
    BackendAPI.screenshot(token, projectId, filename, (res) => {
      cb(res);
    });
  },


};


module.exports = Live;


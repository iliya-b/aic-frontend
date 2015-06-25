'use strict';

var { Auth } = require('../stores/auth.jsx');
var BackendAPI = require('./backend-api.jsx');

var Live = {

  /* Battery */
  setBattery: function (value, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorBattery(token, value, (res) => {
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



  setAccelerometer: function (x, y, z, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorAccelerometer(token, x, y, z, (res) => {
      cb(res);
    });
  },

  initiateRotation: function (cb) {
    var initialRotation = this.rotation.sets[this.rotation.initial];
    this.setAccelerometer(initialRotation.x, initialRotation.y, initialRotation.z, (res) => {
      // cb(res);
      console.log(res);
      this.doFlipRotation(cb);
    });
    this.rotation.started = true;
    this.rotation.last = this.rotation.initial;
  },

  doFlipRotation: function (cb) {
    var nextRotation, lastRotation;
    lastRotation = this.rotation.sets[this.rotation.last];
    var nextRotation = this.rotation.sets[lastRotation.next];
    this.rotation.last = lastRotation.next;
    this.setAccelerometer(nextRotation.x, nextRotation.y, nextRotation.z, (res) => {
      cb(res);
    });
  },

  flipRotation: function (cb) {
    // if(!this.rotation.started){
    //   this.initiateRotation(cb);
    // } else {
      this.doFlipRotation(cb);
    // }
  },

  getRotation: function () {
    return this.rotation.last;
  },


  setLocation: function (lat, lon, cb) {
    var token = Auth.getToken();
    BackendAPI.sensorLocation(token, lat, lon, (res) => {
      cb(res);
    });
  },

};


module.exports = Live;


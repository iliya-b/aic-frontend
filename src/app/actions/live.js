'use strict';

// Reflux
var Reflux = require('reflux');

// APP
var { Auth } = require('goby/stores/auth.jsx');
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var LiveActions = Reflux.createActions({
  'setProjectId': { children: ["completed","failure"] },
  'loadState': {},
  'setState': {},
  'liveReset': {},
  'setDelayedRotation': {},
  'liveCheck': {asyncResult: true},
  'liveStart': {asyncResult: true},
  'liveConnect': {asyncResult: true},
  'liveStop': {asyncResult: true},
  'setSensorBattery': {asyncResult: true},
  'setSensorAccelerometer': {asyncResult: true},
  'setSensorLocation': {asyncResult: true},
  'recordStart': {asyncResult: true},
  'recordStop': {asyncResult: true},
  'screenshot': {asyncResult: true},
});

// Listeners for asynchronous Backend API calls

LiveActions.setProjectId.listen(function () {
  LiveActions.tryLoadNoVNC((res) => {
    if (res.success) {
      this.completed();
    }else{
      this.failure(res.errorMessage);
    }
  });
});

LiveActions.liveCheck.listen(function () {
  var token = Auth.getToken();
  BackendAPI.liveCheck(token, (res) => {
    this.completed( res.error !== 'not-found' );
  });
});

LiveActions.liveStart.listen(function () {
  var token = Auth.getToken();
  BackendAPI.liveStart(token, (res) => {
    this.completed( res.vncip, res.vncport );
  });
});

LiveActions.liveConnect.listen(function (vmhost, vmport) {
  LiveActions.tryConnection( vmhost, vmport, (res) => {
    if (res.success) {
      this.completed();
    }else{
      this.failure(res.errorMessage);
    }
  } );
});

LiveActions.liveStop.listen(function (screenPort) {
  var token = Auth.getToken();
  BackendAPI.liveStop(token, screenPort, (res) => {
    this.completed( res );
  });
  // TODO: Call disconnect from noNVC if connected before
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

window.onscriptsload = function () {
  try {
     window.rfb = new RFB({'target':$D('noVNC_canvas')});
  } catch (exc) {
    console.log('Unable to create RFB client -- ' + exc);
    return; // don't continue trying to connect
  }

  try {
    var exampleSocket = new WebSocket("ws://10.2.0.156:5901");
    exampleSocket.onerror=function(event){
      console.log("Error");
      console.log(LiveActions);
    };
    exampleSocket.onopen = function (event) {
        console.log("open");
        console.log(LiveActions);
    };
  //   var test = window.rfb.connect(window.liveVMhost, window.liveVMport, window.liveVMpassword, window.liveVMpath);
  //   console.log('test');
  // console.log(test);
  } catch (exc) {
    console.log('Unable to connect ' + exc);
    return; // don't continue trying to connect
  }

};

LiveActions.tryConnection = function ( vmhost, vmport, cb ) {

  // FIXME: probably not the best way to set global var.
  window.INCLUDE_URI = "/noVNC/";
  window.liveVMhost = vmhost;
  window.liveVMport = vmport;
  window.liveVMpassword = '';
  window.liveVMpath = '';

  // Load supporting scripts
  Util.load_scripts(["webutil.js", "base64.js", "websock.js", "des.js",
                     "keysymdef.js", "keyboard.js", "input.js", "display.js",
                     "jsunzip.js", "rfb.js", "keysym.js"]);

};

LiveActions.tryLoadNoVNC = function( cb ) {
  $.getScript( '/noVNC/util.js' )
  .done(function() {
    if(typeof Util !== 'undefined'){
      cb( { success: true } );
    }else{
      cb( { success: false, errorMessage: 'Failed to set noVNC utils.' } );
    }
  })
  .fail(function() {
    cb( { success: false, errorMessage: 'Failed to load noVNC utils.' } );
  });
};

module.exports = LiveActions;

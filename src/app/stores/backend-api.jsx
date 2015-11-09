'use strict';

// Vendors
const url = require('url');
const sprintf = require('sprintf');
// var request = require('request');
const SanitizeObject = require('goby/components/libs/sanitize-object.js');
// var debuggerGoby = require('debug')('AiC:backendAPI');

// APP

const BackendObjects = {

  // Backend URLs

  URLPATH_LOGIN: '/user/login',
  URLPATH_PROJECT: '/back/project',
  URLPATH_APK: '/back/application/%s',
  URLPATH_APKTEST: '/back/test/%s',
  URLPATH_LIVE: '/android',
  URLPATH_LIVE_MACHINE: '/android/%s',
  URLPATH_LIVE_SENSOR: '/android/%s/sensor/%s',

  // Validation/Sanitization Objects

  OBJSCHEMA_USER_LOGIN: { type: "object", strict: true,
    properties: {
      username: { type: "string", rules: ["trim"] },
      password: { type: "string" },
    }
  },
  OBJSCHEMA_SENSOR_BATTERY: { type: "object", strict: true,
    properties: {
      level: { type: "integer", min: 0, max: 100 },
    }
  },
  OBJSCHEMA_SENSOR_ACCELEROMETER: { type: "object", strict: true,
    properties: {
      x: { type: "integer", min: 0, max: 100 },
      y: { type: "integer", min: 0, max: 100 },
      z: { type: "integer", min: 0, max: 100 },
    }
  },
  OBJSCHEMA_SENSOR_LOCATION: { type: "object", strict: true,
    properties: {
      latitude: { type: "number" },
      longitude: { type: "number" },
    }
  },
  OBJSCHEMA_SENSOR_RECORDING: { type: "object", strict: true,
    properties: {
      filename: { type: "string", rules: ["trim"] },
      start: { type: "boolean" },
    }
  },

};


var BackendAPI = {


  // Core functions


  backendURL: function(pathname){
    // TODO: Not the best to have globals
    var options = {
      protocol: window.GobyAppGlobals.config.backend.protocol,
      hostname: window.GobyAppGlobals.config.backend.host,
      port: window.GobyAppGlobals.config.backend.port
    };

    if (typeof pathname !== 'undefined'){
      options.pathname = pathname;
    }

    return url.format(options);
  },

  apiCall: function(options){
    // url, data, cb, headers, method, authRequired, file, cbProgress
    options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
    options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
    options.authRequired = (typeof options.authRequired === 'undefined') ? true : options.authRequired;
    options.data = (typeof options.data === 'undefined') ? '' : JSON.stringify(SanitizeObject.sanitizeData(options.data));

    if (options.pathname){
      options.url = this.backendURL(options.pathname);
    }

    if (!options.url){
      throw 'You must inform a valid URL for request.'
    }

    // Request options
    var ajaxOptions = {
      url:  options.url,
      data: options.data,
      xhrFields: {withCredentials: true},
      method: options.method,
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
      headers: options.headers,
      // timeout: AppConfig.config.backend.timeout // TODO: put back timeout
    };

    // Add options for file upload
    if (typeof options.file !== 'undefined'){
      var formData = new FormData();
      formData.append('file', options.file);
      ajaxOptions.data = formData;
      ajaxOptions.cache = false;
      ajaxOptions.contentType = false;
      ajaxOptions.type = 'POST';
      ajaxOptions.xhr = function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',options.cbProgress, false); // For handling the progress of the upload
            }
            return myXhr;
        };
    }

    // Make request using jQuery ajax for now, TODO: change to a lightweight library
    // debuggerGoby('ajaxOptions', ajaxOptions);
    return $.ajax(ajaxOptions)
    .always(function(data, textStatus, errorThrown) {
      // User is not logged in
      if (options.authRequired && textStatus === 'error' && errorThrown === 'Unauthorized') {
        // TODO: Must be changed to state etc...
        var { AuthActions } = require('goby/actions');
        AuthActions.logout.completed();
      }
    });
  },

  apiCallAuth: function(options){
    var { AuthActions } = require('goby/actions');
    options.headers = options.headers ? options.headers : {};
    options.headers.Authorization = sprintf(' Bearer %s', AuthActions.getToken());
    return this.apiCall(options);
  },


  // User //


  userLogin: function (email, pass) {
    var options = {
      pathname: BackendObjects.URLPATH_LOGIN,
      data: {
        data: { username: email, password: pass },
        schema: BackendObjects.OBJSCHEMA_USER_LOGIN
      },
    };
    return this.apiCall(options);
  },

  userProjects: function () {
    var options = {
      pathname: BackendObjects.URLPATH_PROJECT,
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },


  // APKs //


  apkList: function (projectId) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_APK, projectId),
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },

  apkUpload: function (projectId, file, cbProgress) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_APK, projectId),
      method: 'POST',
      file: file,
      cbProgress: cbProgress,
    };
    return this.apiCallAuth(options);
  },


  // LIVE //


  liveList: function () {
    var options = {
      pathname: BackendObjects.URLPATH_LIVE,
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },

  liveStart: function () {
    var options = {
      pathname: BackendObjects.URLPATH_LIVE,
      method: 'POST',
    };
    return this.apiCallAuth(options);
  },

  liveStop: function (liveId) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
      method: 'DELETE',
    };
    return this.apiCallAuth(options);
  },

  liveCheck: function (liveId) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },


  // LIVE SENSORS //


  sensor: function (data, sensor, liveId) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_LIVE_SENSOR, liveId, sensor),
      method: 'POST',
      data: data,
    };
    return this.apiCallAuth(options);
  },

  sensorBattery: function (value, liveId) {
    var data = {
      data: { level: value },
      schema: BackendObjects.OBJSCHEMA_SENSOR_BATTERY
    };
    return this.sensor(data, 'battery', liveId);
  },

  sensorAccelerometer: function (x, y, z, liveId) {
    var data = {
      data: {x: x, y: y, z: z},
      schema: BackendObjects.OBJSCHEMA_SENSOR_ACCELEROMETER
    };
    return this.sensor(data, 'accelerometer', liveId);
  },

  sensorLocation: function (lat, lon, liveId) {
    var data = {
      data: {latitude: lat, longitude: lon},
      schema: BackendObjects.OBJSCHEMA_SENSOR_LOCATION
    };
    return this.sensor(data, 'location', liveId);
  },

  recording: function (filename, start, liveId) {
    var data = {
      data: {filename: filename, start: start},
      schema: BackendObjects.OBJSCHEMA_SENSOR_RECORDING
    };
    return this.sensor(data, 'recording', liveId);
  },

  recordingStart: function (filename, liveId) {
    this.recording(filename, 'true', liveId);
  },

  recordingStop: function (filename, liveId) {
    this.recording(filename, 'false', liveId);
  },

  screenshot: function (filename, liveId) {
    this.recording(filename, 'true', liveId);
  },


  // NOT IMPLEMENTED ON MICROSERVICES //

  // APKs Test //

  apkTestList: function (projectId) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_APKTEST, projectId),
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },

  apkTestUpload: function (projectId, file, cbProgress) {
    var options = {
      pathname: sprintf(BackendObjects.URLPATH_APKTEST, projectId),
      method: 'POST',
      file: file,
      cbProgress: cbProgress,
    };
    return this.apiCallAuth(options);
  },

  // OLD CODE //


  instanceList: function (token, cb) {
    // on success
    //    {"results":[["330cd3fb-73f7-4e20-a9b4-9c2a05d91e9f","nexus"]]}
    var url = this.backendRoot() + "/back/stack";
    this.apiCallAuth(url, null, cb, token, 'GET');
  },

  testCreate: function (token, projectId, instanceId, instanceName, APKIds, APKTestIds, cb) {
    // on success
    //
    // on error
    //     {"error":{"code":409,"message":"Conflict","description":""}}
    var url = this.backendRoot() + "/back/stack";
    var APKIdsFlatten = APKIds.length ? '"' + APKIds.join('","') + '"' : '';
    var APKTestIdsFlatten = APKTestIds.length ? '"' + APKTestIds.join('","') + '"' : '';
    var data = '{"tenantId":"'+projectId+'","stackName":"'+instanceName+'","stackId":"'+instanceId+'","appIds":['+APKIdsFlatten+'],"testIds":['+APKTestIdsFlatten+']}';
    this.apiCallAuth(url, data, cb, token);
  },





};

module.exports = BackendAPI;

'use strict';

// Vendors
var url = require('url') ;
var sprintf = require('sprintf');
// var request = require('request');
var sanitizeHtml = require('sanitize-html');
var Debugger = require('debug')('AiC:backendAPI');

// APP
function sanitize(dirtyContent, sanitizeType){
  switch(sanitizeType){
    case 'html':
      return sanitizeHtml(dirtyContent);
    case 'int':
      return parseInt(dirtyContent);
    case 'text':
    default:
      return sanitizeHtml(dirtyContent, {
        allowedTags: [],
        allowedAttributes: [],
      });
  }
};

var BackendAPI = {

  ERROR: 0,
  URLPATH_LOGIN: '/user/login',
  URLPATH_PROJECT: '/back/project',
  URLPATH_APK_LIST: '/back/application/%s',

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

  sanitizeData: function(dataObj){
    for (var key in dataObj) {
      if (dataObj.hasOwnProperty(key) && typeof dataObj[key] === 'Object') {
        if (dataObj[key].hasOwnProperty('value') && dataObj[key].hasOwnProperty('sanitizeType') ) {
          dataObj[key] = sanitize(dataObj[key]['value'], dataObj[key]['sanitizeType']);
        }else{
          dataObj[key] = this.sanitizeData(dataObj[key]);
        }
      }else{
        dataObj[key] = sanitize(dataObj[key]);
      }
    }
    return dataObj;
  },

  apiCall: function(options){
    // url, data, cb, headers, method, authRequired, file, cbProgress
    options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
    options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
    options.authRequired = (typeof options.authRequired === 'undefined') ? true : options.authRequired;
    options.data = (typeof options.data === 'undefined') ? '' : JSON.stringify(this.sanitizeData(options.data));

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
    options.headers.Authorization = sprintf(" Bearer %s", AuthActions.getToken());
    return this.apiCall(options);
  },

  userLogin: function (email, pass) {
    var options = {
      pathname: this.URLPATH_LOGIN,
      data: { "username": email, "password": pass },
    };
    return this.apiCall(options);
  },

  userProjects: function () {
    var options = {
      pathname: this.URLPATH_PROJECT,
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },


  // NOT IMPLEMENTED ON MICROSERVICES //

  apkList: function (projectId) {
    var options = {
      pathname: sprintf(this.URLPATH_APK_LIST, projectId),
      method: 'GET',
    };
    return this.apiCallAuth(options);
  },

  // OLD CODE //

  apkUpload: function (token, projectId, file, cbProgress, cb) {
    // on error:
    //    {"code":409,"message":"Error 1062 - #23000 - Duplicate entry 'example.apk' for key 'unique_name'"}
    // on success:
    //    {"appId":"ab3e1736-ef99-44e0-b466-c015bc449b10"}
    var url = this.backendRoot() + "/back/application/" + projectId;
    this.apiCallAuth(url, null, cb, token, 'POST', file, cbProgress);
  },

  apkTestUpload: function (token, projectId, file, cbProgress, cb) {
    // on error:
    //    {"code":409,"message":"Error 1062 - #23000 - Duplicate entry 'example.apk' for key 'unique_name'"}
    // on success:
    //    {"appId":"ab3e1736-ef99-44e0-b466-c015bc449b10"}
    var url = this.backendRoot() + "/back/test/" + projectId;
    this.apiCallAuth(url, null, cb, token, 'POST', file, cbProgress);
  },







  apkRemove: function (token, ids, cb) {
    var url = this.backendRoot() + "/back/application/selection";
    var data = '{"ids": ["' + ids.join('","') + '"]}';
    // var data = {ids: ids};
    this.apiCallAuth(url, data, () => {
      url = this.backendRoot() + "/back/application/selection";
      this.apiCallAuth(url, null, cb, token, 'DELETE');
    }, token);
  },



  apkTestList: function (token, projectId, cb) {
    // on success
    //    {"results":[["ab3e1736-ef99-44e0-b466-c015bc449b10","example.apk copy"],["ba435ea0-394a-447d-ba11-06ea6595fb96","example.apk"]]}
    var url = this.backendRoot() + "/back/test/" + projectId;
    this.apiCallAuth(url, null, (res) => {
      var apks = [];
      if (res !== undefined && res.results !== undefined && res.results.length > 0){
        apks = res.results.map(function (apk) {
          return { id: apk[0], name: apk[1] };
        });
      }
      cb(apks);
    }, token, 'GET');
  },

  apkTestRemove: function (token, ids, cb) {
    var url = this.backendRoot() + "/back/test/selection";
    var data = '{"ids": ["' + ids.join('","') + '"]}';
    // var data = {ids: ids};
    this.apiCallAuth(url, data, () => {
      url = this.backendRoot() + "/back/test/selection";
      this.apiCallAuth(url, null, cb, token, 'DELETE');
    }, token);
  },

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

  sensor: function (token, sensor, data, cb) {
    var url = this.backendRoot() + "/back/sensor/" + sensor;
    this.apiCallAuth(url, data, cb, token);
  },

  sensorBattery: function (token, projectId, value, cb) {
    var data = '{"tenantId":"'+projectId+'","level":'+value+'}';
    this.sensor(token, 'battery', data, cb);
  },

  sensorAccelerometer: function (token, projectId, x, y, z, cb) {
    var data = '{"tenantId":"'+projectId+'","x":'+x+',"y":'+y+',"z":'+z+'}';
    this.sensor(token, 'accelerometer', data, cb);
  },

  sensorLocation: function (token, projectId, lat, lon, cb) {
    var data = '{"tenantId":"'+projectId+'","latitude":'+lat+',"longitude":'+lon+'}';
    this.sensor(token, 'location', data, cb);
  },

  recording: function (token, projectId, filename, start, cb) {
    var data = '{"tenantId":"'+projectId+'","filename":"'+filename+'","start":'+start+'}';
    var url = this.backendRoot() + "/back/rabbit/recording";
    this.apiCallAuth(url, data, cb, token);
  },

  recordingStart: function (token, projectId, filename, cb) {
    this.recording(token, projectId, filename, 'true', cb);
  },

  recordingStop: function (token, projectId, filename, cb) {
    this.recording(token, projectId, filename, 'false', cb);
  },

  screenshot: function (token, projectId, filename, cb) {
    this.recording(token, projectId, filename, 'true', cb);
  },

  liveStart: function (token, cb) {
    var url = this.backendRoot() + "/back/live/start";
    var data = '{}';
    this.apiCallAuth(url, data, cb, token);
  },

  liveStop: function (token, screenPort, cb) {
    var url = this.backendRoot() + "/back/live/stop";
    var data = '{"vncport":'+screenPort+'}';
    this.apiCallAuth(url, data, cb, token, 'DELETE');
  },

  liveCheck: function (token, cb) {
    // var url = this.backendRoot() + "/back/live/check";
    // var data = '{}';
    // this.apiCallAuth(url, data, cb, token, 'GET');
    // setTimeout(function () {
    //   cb({error: 'not-found'});
    // },5000);
    var url = this.backendRoot() + "/back/live/start";
    var data = '{}';
    this.apiCallAuth(url, data, cb, token);
  },

};

module.exports = BackendAPI;

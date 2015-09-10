'use strict';

var AppConfig = require('goby/configs/app-config.jsx');
var url = require('url') ;

var BackendAPI = {

  ERROR: 0,

  backendRoot: function(){
    return url.format({
      protocol: AppConfig.backend.protocol,
      hostname: AppConfig.backend.host,
      port: AppConfig.backend.port
    });
  },

  apiCall: function(url, data, cb, headers, method, authRequired){
    method = (typeof method === 'undefined') ? 'POST' : method;
    headers = (typeof headers === 'undefined') ? {} : headers;
    authRequired = (typeof authRequired === 'undefined') ? true : authRequired;
    $.ajax({
      url:  url,
      data: data,
      xhrFields: {withCredentials: true},
      method: method,
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
      headers: headers,
      // timeout: AppConfig.backend.timeout
    })
    .always(function(data, textStatus, errorThrown) {
      // User is not logged in
      if (authRequired && textStatus === 'error' && errorThrown === 'Unauthorized') {
        // TODO: Must be changed to state etc...
        // var { Auth } = require('./auth.jsx');
        // Auth.logout();
        var { AuthActions } = require('goby/actions');
        AuthActions.logout();
      }else{
        cb(data, textStatus, errorThrown);
      }
    });
  },

  apiCallAuth: function(url, data, cb, token, method){
    this.apiCall(url, data, cb, { "X-Auth-Token": token }, method);
  },

  userLogin: function (email, pass, cb) {
    var url = this.backendRoot() + "/back/user/login";
    // var data = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
    var data = '{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}';
    this.apiCall(url, data, cb, undefined, undefined, false);
  },

  userRegister: function (email, pass, name, cb) {
    var url = this.backendRoot() + "/back/user/register";
    var data = '{"user":{"email":"'+email+'","password":"'+pass+'","name":"'+name+'"}}';
    this.apiCall(url, data, cb);
  },

  userLogout: function() {
    // TODO!!
  },

  userProjects: function (token, cb) {
    var url = this.backendRoot() + "/back/project";
    this.apiCallAuth(url, null, cb, token, 'GET');
  },

  apkUpload: function (token, projectId, file, cbProgress, cb) {
    // on error:
    //    {"code":409,"message":"Error 1062 - #23000 - Duplicate entry 'example.apk' for key 'unique_name'"}
    // on success:
    //    {"appId":"ab3e1736-ef99-44e0-b466-c015bc449b10"}
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: this.backendRoot() + "/back/application/" + projectId,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      xhrFields: {withCredentials: true},
      type: 'POST',
      headers: { "X-Auth-Token": token },
      xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',cbProgress, false); // For handling the progress of the upload
            }
            return myXhr;
        },
    })
    .always(function(data, textStatus, errorThrown) {
      cb(data, textStatus, errorThrown);
    });

  },

  apkList: function (token, projectId, cb) {
    // on success
    //    {"results":[["ab3e1736-ef99-44e0-b466-c015bc449b10","example.apk copy"],["ba435ea0-394a-447d-ba11-06ea6595fb96","example.apk"]]}
    var url = this.backendRoot() + "/back/application/" + projectId;
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

  apkRemove: function (token, ids, cb) {
    var url = this.backendRoot() + "/back/application/selection";
    var data = '{"ids": ["' + ids.join('","') + '"]}';
    // var data = {ids: ids};
    this.apiCallAuth(url, data, () => {
      url = this.backendRoot() + "/back/application/selection";
      this.apiCallAuth(url, null, cb, token, 'DELETE');
    }, token);
  },

  apkTestUpload: function (token, projectId, file, cbProgress, cb) {
    // on error:
    //    {"code":409,"message":"Error 1062 - #23000 - Duplicate entry 'example.apk' for key 'unique_name'"}
    // on success:
    //    {"appId":"ab3e1736-ef99-44e0-b466-c015bc449b10"}
    var formData = new FormData();
    formData.append('file', file);

    $.ajax({
      url: this.backendRoot() + "/back/test/" + projectId,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      xhrFields: {withCredentials: true},
      type: 'POST',
      headers: { "X-Auth-Token": token },
      xhr: function() {  // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress',cbProgress, false); // For handling the progress of the upload
            }
            return myXhr;
        },
    })
    .always(function(data, textStatus, errorThrown) {
      cb(data, textStatus, errorThrown);
    });

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

// function progressHandlingFunction(e){
//   console.log(e);
//   if(e.lengthComputable){
//     console.log({value:e.loaded,max:e.total});
//   }
// }

module.exports = BackendAPI;

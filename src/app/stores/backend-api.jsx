'use strict';

var AppConfig = require('../configs/app-config.jsx');

var BackendAPI = {

  ERROR: 0,

  apiCall: function(url, data, cb, headers, method){
    method = (typeof method === 'undefined') ? 'POST' : method;
    headers = (typeof headers === 'undefined') ? {} : headers;
    $.ajax({
      url:  url,
      data: data,
      method: method,
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
      headers: headers,
      // timeout: AppConfig.backend.timeout
    })
    .always(function(data, textStatus, errorThrown) {
      cb(data, textStatus, errorThrown);
    });
  },

  apiCallAuth: function(url, data, cb, token, method){
    this.apiCall(url, data, cb, { "X-Auth-Token": token }, method);
  },

  userLogin: function (email, pass, cb) {
    var url = AppConfig.backend.api + "/back/user/login";
    // var data = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
    var data = '{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}';
    this.apiCall(url, data, cb);
  },

  userRegister: function (email, pass, name, cb) {
    var url = AppConfig.backend.api + "/back/user/register";
    var data = '{"user":{"email":"'+email+'","password":"'+pass+'","name":"'+name+'"}}';
    this.apiCall(url, data, cb);
  },

  userLogout: function() {
    // TODO!!
  },

  userProjects: function (token, cb) {
    var url = AppConfig.backend.api + "/back/project";
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
      url: AppConfig.backend.api + "/back/application/" + projectId,
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
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
    var url = AppConfig.backend.api + "/back/application/" + projectId;
    this.apiCallAuth(url, null, (res) => {
      var apks = res.results.map(function (apk) {
        return { id: apk[0], name: apk[1] };
      });
      cb(apks);
    }, token, 'GET');
  },

  apkRemove: function (token, ids, cb) {
    var url = AppConfig.backend.api + "/back/application/selection";
    var data = '{"ids": ["' + ids.join('","') + '"]}';
    // var data = {ids: ids};
    this.apiCallAuth(url, data, () => {
      url = AppConfig.backend.api + "/back/application/selection";
      this.apiCallAuth(url, null, cb, token, 'DELETE');
    }, token);
  },

  instanceList: function (token, cb) {
    // on success
    //    {"results":[["330cd3fb-73f7-4e20-a9b4-9c2a05d91e9f","nexus"]]}
    var url = AppConfig.backend.api + "/back/stack";
    this.apiCallAuth(url, null, cb, token, 'GET');
  },

  testCreate: function (token, projectId, instanceId, instanceName, APKId, cb) {
    // on success
    //
    var url = AppConfig.backend.api + "/back/stack";
    var data = '{"tenantId":"'+projectId+'","stackName":"'+instanceName+'","stackId":"'+instanceId+'","appId":"'+APKId+'"}';
    this.apiCallAuth(url, data, cb, token);
  },


};

function progressHandlingFunction(e){
  console.log(e);
  if(e.lengthComputable){
    console.log({value:e.loaded,max:e.total});
  }
}

module.exports = BackendAPI;
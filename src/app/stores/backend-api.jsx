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
      timeout: AppConfig.backend.timeout
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
    var data = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
    // var data = '{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}';
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
  }

};

module.exports = BackendAPI;
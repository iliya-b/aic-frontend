'use strict';

var AppConfig = require('../configs/app-config.jsx');

var BackendAPI = {

  ERROR: 0,

  apiCall: function(url, data, cb, headers){
    $.ajax({
      url:  url,
      data: data,
      method: 'POST',
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

  apiCallAuth: function(url, data, cb, token){
    this.apiCall(url, data, cb, { "X-Auth-Token": token });
  },

  userLogin: function (email, pass, cb) {
    var url = AppConfig.backend.api + "/back/user/login";
    var data = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
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
    this.apiCallAuth(url, '', cb, token);
  }

//     pretendRequest: function (email, pass, cb) {
//   // var postData = '{ "email": "'+email+'", "password":"'+pass+'" }';
//   var postData = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
//   // var postData = '{"auth":{"passwordCredentials":{"username":"test","password":"test"}}}';
//   // var url = AppConfig.backend + "/back/user/login"  ;
//   // var xhr = createCORSRequest('POST', url);
//   // xhr.send();
//   console.log('ajax');
//   $.ajax({
//       url:  AppConfig.backend + "/back/user/login",
//       data: postData,
//       method: 'POST',
//       contentType: 'application/json;charset=UTF-8',
//       processData: false,
//       dataType: 'json',
//       // crossDomain: true,
//       // headers: {
//       //   'Access-Control-Allow-Origin': '*',
//       //   // 'test':'123'
//       // },
//       // xhrFields: {withCredentials: true}
//     })
//     .done(function(data) {
//       cb({
//           authenticated: true,
//           token: data['X-Auth-Token']
//         });
//     })
//     .fail(function(data) {
//       // console.log(data);
//       cb({
//         authenticated: false,
//         errorMessage: data.statusText
//       });
//     });
// },


// registerRequest: function (email, pass, name, cb) {
//   var postData = '{"user":{"email":"'+email+'","password":"'+pass+'","name":"'+name+'"}}';
//   $.ajax({
//       url:  AppConfig.backend + "/back/user/register",
//       data: postData,
//       method: 'POST',
//       contentType: 'application/json;charset=UTF-8',
//       processData: false,
//       dataType: 'json',
//     })
//     .done(function(data) {
//       console.log(data);
//       cb({
//           registered: true,
//         });
//     })
//     .fail(function(data) {
//       console.log(data);
//       cb({
//         registered: false,
//         errorMessage: data.statusText
//       });
//     });
// },




// userProjects: function (token, cb) {
//   $.ajax({
//       url:  AppConfig.backend + "/back/project",
//       method: 'GET',
//       contentType: 'application/json;charset=UTF-8',
//       processData: false,
//       dataType: 'json',
//       headers: {
//         "X-Auth-Token": token
//       },
//     })
//     .done(function(data) {
//       console.log(data);
//       cb(data);
//     })
//     .fail(function(data) {
//       console.log(data);
//       cb(data);
//     });
// },

};

module.exports = BackendAPI;
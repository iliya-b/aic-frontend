'use strict';

var $ = jQuery;

var AppConfig = require('../configs/app-config.jsx');

var BackendAPI = {


// // Create the XHR object.
// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // XHR for Chrome/Firefox/Opera/Safari.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // XDomainRequest for IE.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);
//   } else {
//     // CORS not supported.
//     xhr = null;
//   }
//   return xhr;
// }

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }

// // Make the actual CORS request.
// function makeCorsRequest() {
//   // All HTML5 Rocks properties support CORS.
//   var url = 'http://updates.html5rocks.com';

//   var xhr = createCORSRequest('GET', url);
//   if (!xhr) {
//     alert('CORS not supported');
//     return;
//   }

//   // Response handlers.
//   xhr.onload = function() {
//     var text = xhr.responseText;
//     var title = getTitle(text);
//     alert('Response from CORS request to ' + url + ': ' + title);
//   };

//   xhr.onerror = function() {
//     alert('Woops, there was an error making the request.');
//   };

//   xhr.send();
// }

    pretendRequest: function (email, pass, cb) {
  // var postData = '{ "email": "'+email+'", "password":"'+pass+'" }';
  var postData = '{"auth":{"passwordCredentials":{"username":"'+email+'","password":"'+pass+'"}}}';
  // var postData = '{"auth":{"passwordCredentials":{"username":"test","password":"test"}}}';
  // var url = AppConfig.backend + "/back/user/login"  ;
  // var xhr = createCORSRequest('POST', url);
  // xhr.send();
  console.log('ajax');
  $.ajax({
      url:  AppConfig.backend + "/back/user/login",
      data: postData,
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'test':'123'
      // },
      // xhrFields: {withCredentials: true}
    })
    .done(function(data) {
      cb({
          authenticated: true,
          token: data['X-Auth-Token']
        });
    })
    .fail(function(data) {
      // console.log(data);
      cb({
        authenticated: false,
        errorMessage: data.statusText
      });
    });
},


registerRequest: function (email, pass, name, cb) {
  var postData = '{"user":{"email":"'+email+'","password":"'+pass+'","name":"'+name+'"}}';
  $.ajax({
      url:  AppConfig.backend + "/back/user/register",
      data: postData,
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
    })
    .done(function(data) {
      console.log(data);
      cb({
          registered: true,
        });
    })
    .fail(function(data) {
      console.log(data);
      cb({
        registered: false,
        errorMessage: data.statusText
      });
    });
},


userProjects: function (token, cb) {
  $.ajax({
      url:  AppConfig.backend + "/back/user/register",
      // method: 'GET',
      // contentType: 'application/json;charset=UTF-8',
      // processData: false,
      // dataType: 'json',
      headers: {
        "X-Auth-Token:": token
      },
      xhrFields: {withCredentials: true}
    })
    .done(function(data) {
      console.log(data);
      cb(data);
    })
    .fail(function(data) {
      console.log(data);
      cb(data);
    });
},

};

module.exports = BackendAPI;
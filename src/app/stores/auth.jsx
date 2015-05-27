'use strict';

var React = require('react');

var $ = jQuery;

var AppConfig = require('../configs/app-config.jsx');

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

function pretendRequest(email, pass, cb) {
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
}

var Auth = {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) {cb(true);}
      this.onChange(true);
      return;
    }
    pretendRequest(email, pass, (res) => {
      if (res.authenticated) {
        localStorage.token = res.token;
        if (cb) {cb(res);}
        this.onChange(true);
      } else {
        if (cb) {cb(res);}
        this.onChange(false);
      }
    });
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    delete localStorage.token;
    if (cb) {cb();}
    this.onChange(false);
  },

  loggedIn: function () {
    return !!localStorage.token;
  },

  onChange: function () {},

  requireAuth: function (transition) {
    if (!Auth.loggedIn()) {
      this.redirectTo(transition, 'home', {'nextPath' : transition.path});
    }
  },

  userHome: function (transition) {
    if (Auth.loggedIn()) {
      this.redirectTo(transition, AppConfig.userHome);
    }
  },

  redirectTo: function (transition, page, query) {
    if (typeof transition.redirect == 'function'){
      transition.redirect(page, {}, query);
    }else if (typeof transition.transitionTo  == 'function'){
      transition.transitionTo(page, {}, query);
    }
  }

};

var RequireAuthComponent = class extends React.Component {
};

RequireAuthComponent.willTransitionTo = function (transition) {
    Auth.requireAuth(transition);
};

// module.exports = Auth;

module.exports = {
  Auth: Auth,
  RequireAuthComponent: RequireAuthComponent
};
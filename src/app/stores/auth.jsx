'use strict';

var $ = jQuery;

var AppConfig = require('../configs/app-config.jsx');

function pretendRequest(email, pass, cb) {
  var postData = '{ "email": "'+email+'", "password":"'+pass+'" }';
  $.ajax({
      url:  AppConfig.backend + "/back/user/login",
      data: postData,
      method: 'POST',
      contentType: 'application/json;charset=UTF-8',
      processData: false,
      dataType: 'json',
    })
    .done(function(data) {
      cb({
          authenticated: true,
          token: data.token
        });
    })
    .fail(function() {
      cb({authenticated: false});
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
        if (cb) {cb(true);}
        this.onChange(true);
      } else {
        if (cb) {cb(false);}
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

  onChange: function () {}
};

module.exports = Auth;
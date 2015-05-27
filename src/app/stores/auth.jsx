'use strict';

var React = require('react');

var AppConfig = require('../configs/app-config.jsx');
var BackendAPI = require('./backend-api.jsx');

var Auth = {
  login (email, pass, cb) {
    cb = arguments[arguments.length - 1];
    if (localStorage.token) {
      if (cb) {cb(true);}
      this.onChange(true);
      return;
    }
    BackendAPI.pretendRequest(email, pass, (res) => {
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

  register (email, pass, name, cb) {
    BackendAPI.registerRequest(email, pass, name, (res) => {
      if (res.registered) {
        // this.login(email, pass, cb);
        if (cb) {cb(res);}
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

module.exports = {
  Auth: Auth,
  RequireAuthComponent: RequireAuthComponent
};
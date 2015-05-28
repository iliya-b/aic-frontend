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
    BackendAPI.userLogin(email, pass, (res) => {
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
    BackendAPI.userRegister(email, pass, name, (result) => {
      // return { registered:false, errorMessage:'error' }
      // on error {readyState: 0, responseJSON: undefined, status: 0, statusText: "timeout"}
      // on success {"role":{"id":"28fd4df4d463486285d4f27e24346799","name":"admin"}}
        console.log('result');
        console.log(result);
        if (result.status === BackendAPI.ERROR){
          cb({
            registered: false,
            errorMessage: 'It was not possible to register new user. Error: ' + result.statusText
          });
        }else if (result.hasOwnProperty('role')){
          cb({
            registered: true
          });
        }else{
          cb({
            registered: false,
            errorMessage: 'It was not possible to register new user.'
          });
        }
    });
  },

  getToken: function () {
    return localStorage.token;
  },

  logout: function (cb) {
    BackendAPI.userLogout();
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
'use strict';

var React = require('react');

var url = require('url');

var AppConfig = require('../configs/app-config.jsx');
var BackendAPI = require('./backend-api.jsx');

var Auth = {

  ERROR1: 400,
  ERROR2: 401,

  login (email, pass, cb) {
    BackendAPI.userLogin(email, pass, (result) => {
      // return { authenticated:false, errorMessage:'error' }
      // on error
      //    Object {readyState: 4, responseText: "{"error":{"code":400,"message":"Bad request","description":""}}", responseJSON: Object, status: 400, statusText: "Bad Request"}
      //    Object {readyState: 4, responseText: "{"error":{"code":401,"message":"Unauthorized","description":""}}", responseJSON: Object, status: 401, statusText: "Unauthorized"}
      // on success Object {X-Auth-Token: "e824cc2f6dd34c90b2e693dd8ceb8789"}
      // console.log('result');
      // console.log(result);
      if (result.hasOwnProperty('status') &&
         (result.status === Auth.ERROR1 || result.status === Auth.ERROR2)){
        cb({
          authenticated: false,
          errorMessage: 'It was not possible to login. Error: ' + result.statusText
        });
        this.onChange(false);
      }else if (result.hasOwnProperty('X-Auth-Token')){
        localStorage.token = result['X-Auth-Token'];
        cb({
          authenticated: true
        });
        this.onChange(true);
      }else{
        cb({
          authenticated: false,
          errorMessage: 'It was not possible to login.'
        });
        this.onChange(false);
      }
    });
  },

  register (email, pass, name, cb) {
    BackendAPI.userRegister(email, pass, name, (result) => {
      // return { registered:false, errorMessage:'error' }
      // on error {readyState: 0, responseJSON: undefined, status: 0, statusText: "timeout"}
      // on success {"role":{"id":"28fd4df4d463486285d4f27e24346799","name":"admin"}}
      // console.log('result');
      // console.log(result);
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

  requireAuth: function (routerOrTransition) {
    if (!Auth.loggedIn()) {
      this.redirectTo(routerOrTransition, 'home', {'nextPath' : this.getPath(routerOrTransition)});
    }
  },

  // Change if needed to redirectIfLogged
  // userHome: function (transition) {
  //   if (Auth.loggedIn()) {
  //     this.redirectTo(transition, AppConfig.userHome);
  //   }
  // },

  redirectIfLogged: function (routerOrTransition) {
    if (Auth.loggedIn()) {
      var urlQuery = this.getQuery(routerOrTransition);
      var nextPath = urlQuery ? urlQuery.nextPath : null;
      if (nextPath) {
        // Go to the visited page that required authentication
        this.redirectTo(routerOrTransition, nextPath);
      } else {
        // Go to the default user home
        this.redirectTo(routerOrTransition, AppConfig.userHome);
      }
    }
  },

  getQuery: function (routerOrTransition) {
    var currentPath = this.getPath(routerOrTransition);
    var urlParsed = url.parse(currentPath, true);
    return urlParsed.query;
  },

  getPath: function (routerOrTransition) {
    if (routerOrTransition.hasOwnProperty('path')){
      return routerOrTransition.path;
    // transition case
    }else if(typeof routerOrTransition.getCurrentPath  === 'function'){
      return routerOrTransition.getCurrentPath();
    }else{
      return null;
    }
  },

  redirectTo: function (routerOrTransition, page, query) {
    // router case
    if (typeof routerOrTransition.redirect == 'function'){
      routerOrTransition.redirect(page, {}, query);
    // transition case
    }else if (typeof routerOrTransition.transitionTo  == 'function'){
      routerOrTransition.transitionTo(page, {}, query);
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
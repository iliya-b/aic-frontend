'use strict';

// Reflux
var Reflux = require('reflux');

// url
var url = require('url');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');
var Debugger = require('goby/actions/debugger.js');

// Actions
var AuthActions = Reflux.createActions({
  'login': { children: ["completed","failure"] },
  'logout': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
AuthActions.login.listen(function (login, pass) {
  BackendAPI.userLogin(login, pass)
  .then( (result) => {
    if (result.hasOwnProperty('status') &&
       (result.status === 400 || result.status === 401 )){
      Debugger.error('arguments', arguments);
      this.failure('It was not possible to login. Authentication server response was an error. Error: ' + result.statusText);
    }else if (result.hasOwnProperty('token')){
      localStorage.token = result['token'];
      this.completed();
    }else{
      Debugger.error('arguments', arguments);
      this.failure('It was not possible to login. Unknown authentication server response.');
    }
  });
});

// TODO: change to access app state
AuthActions.getToken = function(){
  return localStorage.token;
};

AuthActions.redirectDisconnected = function (routerOrTransition) {
  this.redirectTo(routerOrTransition, 'home', {'nextPath' : this.getPath(routerOrTransition)});
};

AuthActions.redirectConnected = function (routerOrTransition) {
  var urlQuery = AuthActions.getQuery(routerOrTransition);
  var nextPath = urlQuery ? urlQuery.nextPath : null;
  if (nextPath) {
    // Go to the visited page that required authentication
    AuthActions.redirectTo(routerOrTransition, nextPath);
  } else {
    // Go to the default user home
    AuthActions.redirectTo(routerOrTransition, window.GobyAppGlobals.config.userHome);
  }
};

AuthActions.getQuery = function (routerOrTransition) {
  var currentPath = AuthActions.getPath(routerOrTransition);
  var urlParsed = url.parse(currentPath, true);
  return urlParsed.query;
};

AuthActions.getPath = function (routerOrTransition) {
  if (routerOrTransition.hasOwnProperty('path')){
    return routerOrTransition.path;
  // transition case
  }else if(typeof routerOrTransition.getCurrentPath  === 'function'){
    return routerOrTransition.getCurrentPath();
  }else{
    return null;
  }
};

AuthActions.getPathName = function (routerOrTransition) {
  var currentPath = AuthActions.getPath(routerOrTransition);
  var urlParsed = url.parse(currentPath, true);
  return urlParsed.pathname;
};

AuthActions.redirectTo = function (routerOrTransition, page, query) {
  // transition case
  if (typeof routerOrTransition.redirect === 'function'){
    routerOrTransition.redirect(page, {}, query);
  // router case
  }else if (typeof routerOrTransition.transitionTo  === 'function'){
    routerOrTransition.transitionTo(page, {}, query);
  }
};


AuthActions.logout.listen(function () {
  BackendAPI.userLogout( (result) => {
    console.log('logout', result);
    // if (result.hasOwnProperty('status') &&
    //    (result.status === 400 || result.status === 401 )){
    //   this.failure('It was not possible to login. Error: ' + result.statusText);
    // }else if (result.hasOwnProperty('X-Auth-Token')){
    //   localStorage.token = result['X-Auth-Token'];
    //   this.completed();
    // }else{
    //   this.failure('It was not possible to login.');
    // }
  });
});

module.exports = AuthActions;

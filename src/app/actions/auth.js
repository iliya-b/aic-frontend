'use strict';

// Reflux
var Reflux = require('reflux');

// url
var url = require('url');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');

// Actions
var AuthActions = Reflux.createActions({
  'login': { children: ["completed","failure"] },
  'logout': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
AuthActions.login.listen(function (login, pass) {
  BackendAPI.userLogin(login, pass, (result) => {
    // return { authenticated:false, errorMessage:'error' }
    // on error
    //    Object {readyState: 4, responseText: "{"error":{"code":400,"message":"Bad request","description":""}}", responseJSON: Object, status: 400, statusText: "Bad Request"}
    //    Object {readyState: 4, responseText: "{"error":{"code":401,"message":"Unauthorized","description":""}}", responseJSON: Object, status: 401, statusText: "Unauthorized"}
    // on success Object {X-Auth-Token: "e824cc2f6dd34c90b2e693dd8ceb8789"}
    // console.log('result');
    // console.log(result);
    if (result.hasOwnProperty('status') &&
       (result.status === 400 || result.status === 401 )){
      this.failure('It was not possible to login. Error: ' + result.statusText);
    }else if (result.hasOwnProperty('X-Auth-Token')){
      localStorage.token = result['X-Auth-Token'];
      this.completed();
    }else{
      this.failure('It was not possible to login.');
    }
  });
});

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
  // TODO: Should logout send information to the backend?
  // normally this action is called when the backend
  // sent us a unauthorized response
  this.completed();
});

module.exports = AuthActions;

'use strict';

// Reflux
var Reflux = require('reflux');

// Vendor
var Debugger = require('debug')('AiC:Auth:Actions');
var url = require('url');

// APP
var BackendAPI = require('goby/stores/backend-api.jsx');
var AppConfigActions = require('goby/actions/app-config.js');

// Actions
var AuthActions = Reflux.createActions({
  'login': { children: ["completed","failure"] },
  'logout': { children: ["completed","failure"] },
  'check': { children: ["completed","failure"] },
});

// Listeners for asynchronous Backend API calls
AuthActions.login.listen(function (login, pass) {
  BackendAPI.userLogin(login, pass)
  .then( (result) => {
    if (result.hasOwnProperty('status') &&
       (result.status === 400 || result.status === 401 )){
      Debugger('arguments', arguments);
      this.failure('It was not possible to login. Authentication server response was an error. Error: ' + result.statusText);
    }else if (result.hasOwnProperty('token')){
      localStorage.token = result['token'];
      this.completed();
    }else{
      Debugger('arguments', arguments);
      this.failure('It was not possible to login. Unknown authentication server response.');
    }
  });
});


// AuthActions.check.listen(function () {
//   console.log('AuthActions.check.listen');
//   BackendAPI.isUserLogged( (result) => {
//     if (result.hasOwnProperty('status') && result.status === 401 ){
//       this.completed( false );
//     }else if ( result.status === 200 ){
//       this.completed( true );
//     }else{
//       this.failure('It was not possible to verify login status.');
//     }
//   });
// });

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

AuthActions.isLogged = function (loginContext) {
  return loginContext.status === 'LOGIN_STATUS_CONNECTED';
};

AuthActions.loadContextIfEmpty = function(loginContext){

  console.log('loadContextIfEmpty', loginContext);

  // If the context have login information
  if (loginContext) {
    console.log('loginContext valid');
    return new Promise(function(resolve, reject) {
        resolve( AuthActions.isLogged(loginContext) );
      });

  // Otherwise we load the login information
  } else {

    var configLoaded = AppConfigActions.loadConfigFactory();

    return Promise.all([ configLoaded ])
            .then( function (configIsLoaded) {
              return new Promise(function(resolve, reject) {
                console.log('AuthActions.loadContextIfEmpty 2');
                BackendAPI.isUserLogged( (result) => {
                  setTimeout(function(){
                    console.log('loadContextIfEmpty result', result)
                    if (result.hasOwnProperty('status') && result.status === 401 ){
                      // AuthActions.check.completed( false );
                      resolve( false );
                    }else if ( result.hasOwnProperty('tenants') ){
                      // AuthActions.check.completed( true );
                      resolve( true );
                    }else{
                      reject('It was not possible to verify login status.');
                    }
                    }, 10000);
                });
              });
            } );


  }
};

AuthActions.logout.listen(function (showMessage) {
  BackendAPI.userLogout( (result) => {
    // TODO:  Fix the logout result,
    //        for now we have 500 (Internal Server Error)
    console.log('logout', result);
    this.completed(showMessage);
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

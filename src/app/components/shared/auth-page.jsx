'use strict';

// React
var React = require('react');

// APP
var { AuthActions } = require('goby/actions');

// Redirects user if he is already logged in
// Opposite to AuthRequired
var AuthPage = class extends React.Component{};

AuthPage.willTransitionTo = function (transition, params, query, callback) {

    // TODO: globals should not be used
    var globalContext = window.GobyAppGlobals.login;
    console.log('AuthPage willTransitionTo', globalContext);
    AuthActions.loadContextIfEmpty(globalContext).then( function ( userIsLogged ) {
      console.log('AuthPage result', userIsLogged);
      if ( userIsLogged ) {
        console.log('AuthPage transition', transition);
        // transition.redirect('/home');
        AuthActions.redirectConnected(transition);
        callback();
        // AuthActions.redirectDisconnected(transition);
      }else{
        callback();
      }
    }, function (err) {
      console.log('Something really bad happened on AuthPage.', err);
    } );

};

AuthPage.willTransitionFrom = function (transition, component, callback) {

  // TODO: globals should not be used
  var globalContext = window.GobyAppGlobals.login;
  console.log('AuthPage willTransitionFrom', globalContext, arguments);
  AuthActions.loadContextIfEmpty(globalContext).then( function ( userIsLogged ) {
    console.log('AuthPage willTransitionFrom result', userIsLogged);
    if ( !userIsLogged ) {
      console.log('AuthPage willTransitionFrom transition', transition);
      // transition.redirect('/home');
      AuthActions.redirectDisconnected(transition);
      callback();
      // AuthActions.redirectDisconnected(transition);
    }else{
      callback();
    }
  }, function (err) {
    console.log('Something really bad happened on auth.', err);
  } );

};

module.exports = AuthPage;
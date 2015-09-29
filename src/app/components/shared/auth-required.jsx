'use strict';

// React
var React = require('react');

// APP
var { AuthActions } = require('goby/actions');

// Redirects user if he is not logged in
// Opposite to AuthPage
var AuthRequired = class extends React.Component{

  // componentWillMount() {
  //   var myContext = this.context;
  //   console.log('AuthRequired componentWillMount');
  //   AuthActions.loadContextIfEmpty().then( function ( userIsLogged ) {
  //     console.log('prom result', userIsLogged);
  //     if ( !userIsLogged ) {
  //       console.log('myContext', myContext);
  //       AuthActions.redirectDisconnected(myContext.router);
  //     }
  //   }, function (err) {
  //     console.log('Something really bad happened on auth.', err);
  //   } );
  // }

};

AuthRequired.willTransitionTo = function (transition, params, query, callback) {

    // TODO: globals should not be used
    var globalContext = window.GobyAppGlobals.login;
    console.log('AuthRequired willTransitionTo', globalContext);
    AuthActions.loadContextIfEmpty(globalContext).then( function ( userIsLogged ) {
      console.log('prom result', userIsLogged);
      if ( !userIsLogged ) {
        console.log('transition', transition);
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

AuthRequired.contextTypes = {
  muiTheme: React.PropTypes.object,
  router: React.PropTypes.func,
  loginStatus: React.PropTypes.func,
}

module.exports = AuthRequired;
/* global window */
'use strict';

// React
const React = require('react');

// APP
const {AuthActions} = require('app/actions');

// Redirects user if he is not logged in
// Opposite to AuthPage
const AuthRequired = class extends React.Component {

	// componentWillMount() {
	//   const myContext = this.context;
	//   console.log('AuthRequired componentWillMount');
	//   AuthActions.loadContextIfEmpty().then( function ( userIsLogged ) {
	//     console.log('prom result', userIsLogged);
	//     if ( !userIsLogged ) {
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
	const globalContext = window.GobyAppGlobals.login;
	console.log('AuthRequired willTransitionTo', globalContext);
	AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
		console.log('prom result', userIsLogged);
		if (userIsLogged) {
			callback();
		} else {
			console.log('transition', transition);
			// transition.redirect('/home');
			AuthActions.redirectDisconnected(transition);
			callback();
			// AuthActions.redirectDisconnected(transition);
		}
	}, err => {
		console.log('Something really bad happened on auth.', err);
	});
};

AuthRequired.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.func,
	loginStatus: React.PropTypes.func
};

module.exports = AuthRequired;

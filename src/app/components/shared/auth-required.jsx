'use strict';

// React
const React = require('react');

// Vendors
const debug = require('debug')('AiC:Components:AuthRequired');

// APP
const AuthActions = require('app/actions/auth');
const AuthStore = require('app/stores/auth');

// Redirects user if he is not logged in
// Opposite to AuthPage
const AuthRequired = class extends React.Component {

	componentWillMount() {
		this.unsubscribe = AuthStore.listen(this._onStateChange);
	//   const myContext = this.context;
	//   debug('AuthRequired componentWillMount');
	//   AuthActions.loadContextIfEmpty().then( function ( userIsLogged ) {
	//     debug('prom result', userIsLogged);
	//     if ( !userIsLogged ) {
	//       debug('myContext', myContext);
	//       AuthActions.redirectDisconnected(myContext.router);
	//     }
	//   }, function (err) {
	//     debug('Something really bad happened on auth.', err);
	//   } );
		// AuthActions
		debug('AuthRequired.componentWillMount');
		if (AuthActions.isLogged()) {
			debug('user is logged');
		} else {
			debug('componentWillMount', this.context, this.props);
			debug('user not logged, redirect');
			AuthActions.redirectDisconnected(this.context.router, this.props.location);
		}
		// const stateObj = { foo: "bar" };
		// history.pushState(stateObj, "page 2", "bar.html");
	}

	_onStateChange(state) {
		debug('AuthRequired._onStateChange', state);
	}

	componentWillUnmount() {
		// Subscribe and unsubscribe because we don't want to use the mixins
		this.unsubscribe();
		debug('unsubscribe');
	}
};

AuthRequired.willTransitionTo = function (transition, params, query, callback) {
	// TODO: globals should not be used
	// const globalContext = window.GobyAppGlobals.login;
	// debug('AuthRequired willTransitionTo', globalContext);
	// AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
	// 	debug('prom result', userIsLogged);
	// 	if (userIsLogged) {
	// 		callback();
	// 	} else {
	// 		debug('transition', transition);
	// 		// transition.redirect('/home');
	// 		AuthActions.redirectDisconnected(transition);
	// 		callback();
	// 		// AuthActions.redirectDisconnected(transition);
	// 	}
	// }, err => {
	// 	debug('Something really bad happened on auth.', err);
	// });

	// if (!AuthActions.isLogged()) {
	// 	AuthActions.redirectDisconnected(transition);
	// }
	debug('AuthRequired.willTransitionTo');
	callback();
};

AuthRequired.contextTypes = {
	muiTheme: React.PropTypes.object,
	router: React.PropTypes.object,
	loginStatus: React.PropTypes.func
};

AuthRequired.propTypes = {
	location: React.PropTypes.object
};

module.exports = AuthRequired;

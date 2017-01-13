'use strict';

import React from 'react';
import AuthActions from 'app/actions/auth';

const debug = require('debug')('AiC:Components:AuthPage');

// Redirects user if he is already logged in
// Opposite to AuthRequired
const AuthPage = class extends React.Component {

	componentWillMount() {
		debug('AuthPage.componentWillMount');
		if (AuthActions.isLogged()) {
			AuthActions.redirectConnected(this.context.router, this.props.location);
		} else {
			debug('componentWillMount', this.context, this.props);
			debug('user not logged, redirect');
		}
	}

};

// AuthPage.willTransitionTo = function (transition, params, query, callback) {
// 	// TODO: globals should not be used
// 	const globalContext = window.GobyAppGlobals.login;
// 	debug('AuthPage willTransitionTo', globalContext);
// 	AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
// 		debug('AuthPage result', userIsLogged);
// 		if (userIsLogged) {
// 			debug('AuthPage transition', transition);
// 			// transition.redirect('/home');
// 			// AuthActions.redirectConnected(transition, this.props.location);
// 			AuthActions.redirectConnected(this.context.router, this.props.location);
// 			callback();
// 			// AuthActions.redirectDisconnected(transition);
// 		} else {
// 			callback();
// 		}
// 	}, err => {
// 		debug('Something really bad happened on AuthPage.', err);
// 	});
// };

// AuthPage.willTransitionFrom = function (transition, component, callback) {
	// TODO: globals should not be used
	// const globalContext = window.GobyAppGlobals.login;
	// debug('AuthPage willTransitionFrom', globalContext, arguments);
	// AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
	// 	debug('AuthPage willTransitionFrom result', userIsLogged);
	// 	if (userIsLogged) {
	// 		callback();
	// 	} else {
	// 		debug('AuthPage willTransitionFrom transition', transition);
	// 		// transition.redirect('/home');
	// 		AuthActions.redirectDisconnected(transition);
	// 		callback();
	// 		// AuthActions.redirectDisconnected(transition);
	// 	}
	// }, err => {
	// 	debug('Something really bad happened on auth.', err);
	// });
// };

AuthPage.contextTypes = {
	router: React.PropTypes.object
};

AuthPage.propTypes = {
	location: React.PropTypes.object
};

module.exports = AuthPage;

/* global window */
'use strict';

// React
const React = require('react');

// Vendors
const debug = require('debug')('AiC:Components:AuthPage');

// APP
const {AuthActions} = require('app/actions');

// Redirects user if he is already logged in
// Opposite to AuthRequired
const AuthPage = class extends React.Component {};

AuthPage.willTransitionTo = function (transition, params, query, callback) {
	// TODO: globals should not be used
	const globalContext = window.GobyAppGlobals.login;
	debug('AuthPage willTransitionTo', globalContext);
	AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
		debug('AuthPage result', userIsLogged);
		if (userIsLogged) {
			debug('AuthPage transition', transition);
			// transition.redirect('/home');
			AuthActions.redirectConnected(transition);
			callback();
			// AuthActions.redirectDisconnected(transition);
		} else {
			callback();
		}
	}, err => {
		debug('Something really bad happened on AuthPage.', err);
	});
};

AuthPage.willTransitionFrom = function (transition, component, callback) {
	// TODO: globals should not be used
	const globalContext = window.GobyAppGlobals.login;
	debug('AuthPage willTransitionFrom', globalContext, arguments);
	AuthActions.loadContextIfEmpty(globalContext).then(userIsLogged => {
		debug('AuthPage willTransitionFrom result', userIsLogged);
		if (userIsLogged) {
			callback();
		} else {
			debug('AuthPage willTransitionFrom transition', transition);
			// transition.redirect('/home');
			AuthActions.redirectDisconnected(transition);
			callback();
			// AuthActions.redirectDisconnected(transition);
		}
	}, err => {
		debug('Something really bad happened on auth.', err);
	});
};

module.exports = AuthPage;

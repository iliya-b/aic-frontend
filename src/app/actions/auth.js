/* global window, localStorage */
'use strict';

import url from 'url';
import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';

const debug = require('debug')('AiC:Auth:Actions');

const AuthActions = Reflux.createActions({
	login: {asyncResult: true},
	logout: {asyncResult: true},
	tryLogout: {},
	refreshState: {}
});

AuthActions.login.listenAndPromise(Gateway.user.login);
AuthActions.logout.listenAndPromise(Gateway.user.logout);

// TODO: change to access app state
AuthActions.getToken = function () {
	debug('getToken');
	debug(localStorage);
	if (localStorage.getItem('token') && localStorage.getItem('token') === '') {
		AuthActions.removeToken();
	}
	return localStorage.getItem('token');
};

AuthActions.setToken = function (token) {
	debug('setToken');
	debug(localStorage);
	localStorage.setItem('token', token);
};

AuthActions.removeToken = function () {
	debug('removeToken');
	localStorage.removeItem('token');
};

// AuthActions.isLogged = function (loginContext) {
AuthActions.isLogged = function () {
	debug('isLogged');
	debug('token', AuthActions.getToken());
	debug('Boolean', Boolean(AuthActions.getToken()));
	return Boolean(AuthActions.getToken()) !== false;
};

// TODO: all this redirects and getFoo should be updated to the new format of react-router
AuthActions.redirectDisconnected = function (routerOrTransition, routerLocation) {
	this.redirectTo(routerOrTransition, '/', {nextPath: this.getPath(routerOrTransition, routerLocation)});
};

AuthActions.redirectConnected = function (routerOrTransition, location) {
	// const urlQuery = AuthActions.getQuery(routerOrTransition);
	const nextPath = location.query && location.query.nextPath ? location.query.nextPath : null;
	debug('nextPath', nextPath);
	if (nextPath) {
		// Go to the visited page that required authentication
		AuthActions.redirectTo(routerOrTransition, nextPath);
	} else {
		// Go to the default user home
		AuthActions.redirectTo(routerOrTransition, window.GobyAppGlobals.config.userHome);
	}
};

AuthActions.getQuery = function (routerOrTransition) {
	const currentPath = AuthActions.getPath(routerOrTransition);
	debug('currentPath', currentPath);
	const urlParsed = url.parse(currentPath, true);
	return urlParsed.query;
};

AuthActions.getPath = function (routerOrTransition, routerLocation) {
	debug('AuthActions.getPath', routerOrTransition, routerLocation);
	if (routerLocation && 'pathname' in routerLocation) {
		return routerLocation.pathname;
	} else if ('path' in routerOrTransition) {
		return routerOrTransition.path;
	// transition case
	} else if (typeof routerOrTransition.getCurrentPath === 'function') {
		return routerOrTransition.getCurrentPath();
	}
	return null;
};

AuthActions.getPathName = function (routerOrTransition) {
	const currentPath = AuthActions.getPath(routerOrTransition);
	debug('currentPath', currentPath);
	const urlParsed = url.parse(currentPath, true);
	return urlParsed.pathname;
};

// TODO: remove unused cases
AuthActions.redirectTo = function (routerOrTransition, page, query) {
	// react-router 2.0 case
	if (typeof routerOrTransition.push === 'function') {
		debug('transitionTo');
		routerOrTransition.push({pathname: page, query});
	// transition case
	} else if (typeof routerOrTransition.redirect === 'function') {
		debug('transitionTo');
		routerOrTransition.redirect(page, {}, query);
	// router case
	} else if (typeof routerOrTransition.transitionTo === 'function') {
		debug('router');
		routerOrTransition.transitionTo(page, {}, query);
	}
};

AuthActions.loadContextIfEmpty = function (loginContext) {
	debug('loadContextIfEmpty', loginContext);

	throw new Error('loadContextIfEmpty is deprecated');
	// // If the context have login information
	// if (loginContext) {
	// 	debug('loginContext valid');
	// 	return new Promise(resolve => {
	// 		resolve(AuthActions.isLogged(loginContext));
	// 	});

	// // Otherwise we load the login information
	// }
	// const configLoaded = AppConfigActions.loadConfigFactory();

	// return Promise.all([configLoaded])
	// 	.then(() => {
	// 		return new Promise((resolve, reject) => {
	// 			debug('AuthActions.loadContextIfEmpty 2');
	// 			BackendAPI.isUserLogged(result => {
	// 				setTimeout(() => {
	// 					debug('loadContextIfEmpty result', result);
	// 					if (result.hasOwnProperty('status') && result.status === 401) {
	// 						// AuthActions.check.completed( false );
	// 						resolve(false);
	// 					} else if (result.hasOwnProperty('tenants')) {
	// 						// AuthActions.check.completed( true );
	// 						resolve(true);
	// 					} else {
	// 						reject('It was not possible to verify login status.');
	// 					}
	// 				}, 10000);
	// 			});
	// 		});
	// 	});
};

module.exports = AuthActions;

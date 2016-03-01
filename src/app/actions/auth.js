/* global window, localStorage */
'use strict';

// Reflux
const Reflux = require('reflux');

// Vendor
const debug = require('debug')('AiC:Auth:Actions');
const url = require('url');

// APP
const BackendAPI = require('app/stores/backend-api');
const AppConfigActions = require('app/actions/app-config');

// Actions
const AuthActions = Reflux.createActions({
	login: {children: ['completed', 'failure']},
	logout: {children: ['completed', 'failure']},
	check: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls
AuthActions.login.listen(function (login, pass) {
	BackendAPI.userLogin(login, pass)
	.then(result => {
		debug('then auth login');
		debug(arguments);
		if (result.hasOwnProperty('status') &&
			(result.status === 400 || result.status === 401)) {
			debug('arguments', arguments);
			this.failure(`It was not possible to login. Authentication server response was an error. Error: ${result.statusText}`);
		} else if (result.hasOwnProperty('token')) {
			localStorage.token = result.token;
			this.completed();
		} else {
			debug('arguments', arguments);
			this.failure('It was not possible to login. Unknown authentication server response.');
		}
	})
	.catch(err => {
		debug('catch auth login');
		debug(arguments, err);
		this.failure('It was not possible to login. Please verify that your credentials are correct.');
	});
});

// AuthActions.check.listen(function () {
//   debug('AuthActions.check.listen');
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
AuthActions.getToken = function () {
	return localStorage.token;
};

// TODO: all this redirects and getFoo should be updated to the new format of react-router
AuthActions.redirectDisconnected = function (routerOrTransition) {
	this.redirectTo(routerOrTransition, '/', {nextPath: this.getPath(routerOrTransition)});
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

AuthActions.getPath = function (routerOrTransition) {
	if (routerOrTransition.hasOwnProperty('path')) {
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

// AuthActions.isLogged = function (loginContext) {
AuthActions.isLogged = function () {
	// return loginContext.status === 'LOGIN_STATUS_CONNECTED';
	return localStorage.token !== null && localStorage.token !== '';
};

AuthActions.loadContextIfEmpty = function (loginContext) {
	debug('loadContextIfEmpty', loginContext);

	// If the context have login information
	if (loginContext) {
		debug('loginContext valid');
		return new Promise(resolve => {
			resolve(AuthActions.isLogged(loginContext));
		});

	// Otherwise we load the login information
	}
	const configLoaded = AppConfigActions.loadConfigFactory();

	return Promise.all([configLoaded])
		.then(() => {
			return new Promise((resolve, reject) => {
				debug('AuthActions.loadContextIfEmpty 2');
				BackendAPI.isUserLogged(result => {
					setTimeout(() => {
						debug('loadContextIfEmpty result', result);
						if (result.hasOwnProperty('status') && result.status === 401) {
							// AuthActions.check.completed( false );
							resolve(false);
						} else if (result.hasOwnProperty('tenants')) {
							// AuthActions.check.completed( true );
							resolve(true);
						} else {
							reject('It was not possible to verify login status.');
						}
					}, 10000);
				});
			});
		});
};

AuthActions.logout.listen(function (showMessage) {
	BackendAPI.userLogout()
	.then(result => {
		localStorage.token = '';
		// TODO:  Fix the logout result,
		//        for now we have 500 (Internal Server Error)
		debug('logout', result);
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

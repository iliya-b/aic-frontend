/* global window, fetch, XMLHttpRequest */
'use strict';

// Vendors
const url = require('url');
const sprintf = require('sprintf');
const debug = require('debug')('AiC:Libs:RestAPI');

// APP
const SanitizeObject = require('app/libs/sanitize-object');

function parseJSON(response) {
	debug('response parseJSON', response);
	if (response.statusText === 'No Content') {
		return {};
	}
	return response.json();
}

function parseJSONXHR(xhr) {
	debug('response parseJSON', xhr);
	if (xhr.statusText === 'No Content') {
		return {};
	}
	return JSON.parse(xhr.responseText);
}

const RestAPI = {

	// Core functions

	backendURL(pathname) {
		// TODO: Not the best to have globals
		const options = {
			protocol: window.GobyAppGlobals.config.backend.protocol,
			hostname: window.GobyAppGlobals.config.backend.host,
			port: window.GobyAppGlobals.config.backend.port
		};

		if (typeof pathname !== 'undefined') {
			options.pathname = pathname;
		}

		return url.format(options);
	},

	apiCall(options) {
		// url, data, cb, headers, method, authRequired, file, cbProgress
		options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
		options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
		// TODO: change to signoutOnUnauthorized
		options.authRequired = (typeof options.authRequired === 'undefined') ? false : options.authRequired;
		if (typeof options.data === 'undefined') {
			options.data = options.rawData || false;
		} else {
			options.data = JSON.stringify(SanitizeObject.sanitizeData(options.data));
		}

		if (options.pathname) {
			options.url = this.backendURL(options.pathname);
		}

		if (!options.url) {
			throw new Error('You must inform a valid URL for request.');
		}

		// Make a different call (XHR instead of fetch) for file upload with progress
		if (options.method === 'POST' && options.cbProgress) {
			// TODO: Change to fetch API once the fetch-streams are available https://github.com/whatwg/fetch/issues/88 https://github.com/whatwg/fetch/issues/21
			return new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				xhr.onload = () => {
					debug('XHR onload', xhr, xhr.status, xhr.responseText);
					if (xhr.status >= 200 && xhr.status < 300) {
						resolve(parseJSONXHR(xhr));
					} else if (xhr.status === 401 && options.authRequired) {
						debug('XHR onload 401');
						const AuthActions = require('app/actions/auth');
						AuthActions.logout('Your session has been ended2.');
					} else if (xhr.status === 500) {
						debug('XHR onload 500');
						const AppActions = require('app/actions/app');
						AppActions.displayServerError('Something went wrong with the API server. Please contact service administration.');
					} else {
						const error = new Error(xhr.responseText);
						throw error;
					}
				};
				xhr.onerror = () => {
					debug('XHR onerror', xhr, xhr.status, xhr.responseText);
					reject(null, 'error XHR onerror');
				};
				xhr.onabort = () => {
					debug('XHR onabort', xhr, xhr.status, xhr.responseText);
					reject(null, 'aborted');
				};
				xhr.upload.onprogress = function (event) {
					debug('XHR onprogress', event);
					options.cbProgress(event);
					if (event.lengthComputable) {
						const percent = Math.round((event.loaded / event.total) * 100);
						debug('XHR onprogress', percent);
					}
				};
				xhr.open('POST', options.url);
				let key;
				for (key in options.headers) {
					if ({}.hasOwnProperty.call(options.headers, key)) {
						xhr.setRequestHeader(key, options.headers[key]);
					}
				}
				xhr.send(options.rawData);
			});
		}

		// Make request
		debug('doing ajax', arguments);

		const myInit = {
			method: options.method,
			headers: options.headers,
			mode: 'cors',
			cache: 'default'
		};

		if (options.data) {
			myInit.body = options.data;
		}

		return new Promise((resolve, reject) => {
			fetch(options.url, myInit)
			// .then((response) => {
			//   debug('return ajax', arguments, response);
			// })
			.then(response => {
				debug('response checkStatus', response);
				if (response.status >= 200 && response.status < 300) {
					return response;
				} else if (response.status === 401 && options.authRequired) {
					debug('fetch response', response);
					const AuthActions = require('app/actions/auth');
					AuthActions.logout('Your session has been ended2.');
				} else if (response.status === 500) {
					debug('response.status === 500', response, options.url, myInit);
					const AppActions = require('app/actions/app');
					AppActions.displayServerError('Something went wrong with the API server. Please contact service administration.');
				}
				const error = new Error(response.statusText);
				error.response = response;
				throw error;
			})
			// .then(checkStatus)
			.then(parseJSON)
			.then(data => {
				debug('return ajax', arguments, data);
				debug('request succeeded with JSON response', data);
				resolve(data);
			})
			.catch((error, e2) => {
				debug('request failed 1', error);
				debug('request failed 2', e2);
				debug('arguments', arguments);
				reject(null, error, error);
			});
		});
	},

	apiCallAuth(options) {
		const AuthActions = require('app/actions/auth');
		options.headers = options.headers ? options.headers : {};
		options.headers.Authorization = sprintf(' Bearer %s', AuthActions.getToken());
		options.authRequired = true;
		return this.apiCall(options);
	}

};

module.exports = RestAPI;

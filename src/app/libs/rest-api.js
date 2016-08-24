/* global window, fetch, XMLHttpRequest */
'use strict';

// Vendors
const url = require('url');
const debug = require('debug')('AiC:Libs:RestAPI');

// APP
const SanitizeObject = require('app/libs/sanitize-object');

function parseJSON(response) {
	debug('response parseJSON', response);
	if (response.statusText === 'No Content' ||
		response.statusText === 'Accepted') {
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
		debug('apiCall', options);
		// url, data, cb, headers, method, authRequired, file, cbProgress
		options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
		options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
		// TODO: change to signoutOnUnauthorized
		options.authRequired = (typeof options.authRequired === 'undefined') ? false : options.authRequired;
		options.showError500Dialog = (typeof options.showError500Dialog === 'undefined') ? true : options.showError500Dialog;
		if (typeof options.data === 'undefined') {
			options.body = options.rawData || false;
		} else {
			options.body = JSON.stringify(SanitizeObject.sanitizeData(options.data));
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
						let result = {};
						if (options.includeRequest) {
							result = {request: options.requestObj, response: parseJSONXHR(xhr)};
						} else {
							result = parseJSONXHR(xhr);
						}
						resolve(result);
					} else if (xhr.status === 401 && options.authRequired) {
						debug('XHR onload 401');
						const AuthActions = require('app/actions/auth');

						AuthActions.tryLogout('Your session has been ended2.');
					} else if (xhr.status === 500 && options.showError500Dialog) {
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
					const error = 'error XHR onerror';
					let result = {};
					if (options.includeRequest) {
						result = {request: options.requestObj, error};
					} else {
						result = error;
					}
					reject(result);
				};
				xhr.onabort = () => {
					debug('XHR onabort', xhr, xhr.status, xhr.responseText);
					const error = 'XHR aborted';
					let result = {};
					if (options.includeRequest) {
						result = {request: options.requestObj, error};
					} else {
						result = error;
					}
					reject(result);
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

		if (options.body) {
			myInit.body = options.body;
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

					AuthActions.tryLogout('Your session has been ended2.');
				} else if (response.status === 500 && options.showError500Dialog) {
					debug('response.status === 500', response, options.url, myInit);
					const AppActions = require('app/actions/app');

					AppActions.displayServerError('Something went wrong with the API server. Please contact service administration.');
				}
				const error = new Error(response.statusText);
				error.response = response;
				error.status = response.status;
				throw error;
			})
			// .then(checkStatus)
			.then(parseJSON)
			.then(data => {
				debug('return ajax', arguments, data);
				debug('request succeeded with JSON response', data);
				let result = {};
				if (options.includeRequest) {
					result = {request: options.requestObj, response: data};
				} else {
					result = data;
				}
				resolve(result);
			})
			.catch((err, e2) => {
				debug('request failed 1', err, err.message, err.name);
				debug('request failed 2', e2);
				debug('arguments', arguments);
				if (err.message === 'Failed to fetch' && err.name === 'TypeError') {
					const AppActions = require('app/actions/app');

					AppActions.displayServerError('Impossible to reach API server. Please contact service administration.');
				}
				let result = {};
				if (options.includeRequest) {
					result = {request: options.requestObj, err};
				} else {
					result = err;
				}
				reject(result);
			});
		});
	},

	apiCallAuth(options) {
		const AuthActions = require('app/actions/auth');

		options.headers = options.headers ? options.headers : {};
		options.headers.Authorization = ` Bearer ${AuthActions.getToken()}`;
		options.authRequired = true;
		return this.apiCall(options);
	}

};

module.exports = RestAPI;

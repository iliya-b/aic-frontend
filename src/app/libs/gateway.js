/* global FormData */
'use strict';

import {template, setTemplateDelimiters} from 'app/libs/helpers';

// Set template for str substitution (used on pathnames)
setTemplateDelimiters('{', '}');

const debug = require('debug')('AiC:Libs:Gateway');

const Gateway = {

	requestAPI: {},

	register(options) {
		debug('register', options);
		Gateway[options.namespace] = Gateway[options.namespace] || {};
		options.actions.forEach(action => {
			debug('actions', action);
			action.namespace = options.namespace;
			if (action.action.name in Gateway[options.namespace]) {
				throw new Error('Duplicated action on Gateway namespace. ', action.action.name, 'already exists in', options.namespace);
			}
			Gateway[options.namespace][action.action.name] = Gateway.request.bind(Gateway, action);
			if ('allowMany' in action && action.allowMany) {
				Gateway[options.namespace][`${action.action.name}Many`] = Gateway.many.bind(Gateway, action);
			}
		});
	},

	adapter(adapters) {
		// TODO: verifications conflicts etc
		Gateway.adapters = adapters;
	},

	getAdapter(namespace, action, type) {
		if (Gateway.adapters[namespace] &&
				Gateway.adapters[namespace][action] &&
				Gateway.adapters[namespace][action][type]) {
			return Gateway.adapters[namespace][action][type];
		}
		return false;
	},

	/**
	 * [many description]
	 * @param  {[type]} options      [description]
	 * @param  {[type]} objArray     [description]
	 * @param  {[type]} extraOptions [description]
	 * @return {[type]}              [description]
	 */
	many(options, objArray, extraOptions) {
		// return request(options, obj, extraOptions);
		return Promise.all(
			objArray.map(obj => {
				return Gateway[options.namespace][options.action.name](obj, extraOptions);
			}))
		.then(values => {
			if (options.includeRequest || extraOptions.includeRequest) {
				return {response: values, request: objArray};
			}
			return values;
		});
	},

	request(options, obj, extraOptions) {
		debug('request', options, obj, extraOptions);
		if (options.placeholder) {
			return options.placeholder();
		}
		const requestAdapter = this.getAdapter(options.namespace, options.action.name, 'request');
		const responseAdapter = this.getAdapter(options.namespace, options.action.name, 'response');
		const schemaAdapter = this.getAdapter(options.namespace, options.action.name, 'schema');
		let optionsAPI = {
			method: options.action.method,
			requestObj: obj
		};
		if (extraOptions) {
			optionsAPI = Object.assign({}, optionsAPI, extraOptions);
		}
		const requestCallerName = options.requestAPI ? options.requestAPI : 'default';
		if (typeof Gateway.requestAPI[requestCallerName] !== 'function') {
			throw new Error('Missing or not a function Gateway.requestAPI[', requestCallerName, ']');
		}
		const requestCaller = Gateway.requestAPI[requestCallerName];
		if (options.pathname) {
			optionsAPI.pathname = template(options.pathname, obj);
		}
		if (options.url) {
			optionsAPI.url = options.url;
		}
		if (obj && obj.file) {
			optionsAPI.rawData = new FormData();
			optionsAPI.rawData.append('file', obj.file);
			optionsAPI.cbProgress = obj.progress;
		}
		if (obj && options.schema) {
			optionsAPI.data = {
				data: requestAdapter ? requestAdapter(obj) : obj,
				schema: schemaAdapter ? schemaAdapter(options, obj) : options.schema
			};
		}
		debug(optionsAPI);
		if (responseAdapter) {
			return requestCaller(optionsAPI).then(responseAdapter);
		}
		return requestCaller(optionsAPI);
	}

};

module.exports = Gateway;

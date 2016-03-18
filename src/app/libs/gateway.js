/* global FormData */
'use strict';

// Vendors
import S from 'string';

const debug = require('debug')('AiC:Libs:Gateway');

// APP
import RestAPI from 'app/libs/rest-api';

const Gateway = {

	actions: {
		list: {
			name: 'list',
			method: 'GET'
		},
		create: {
			name: 'create',
			method: 'POST'
		},
		update: {
			name: 'update',
			method: 'PUT'
		},
		delete: {
			name: 'delete',
			method: 'DELETE'
		}
	},

	register(options) {
		debug('register', options);
		Gateway[options.namespace] = Gateway[options.namespace] || {};
		options.actions.forEach(action => {
			debug('actions', action);
			action.namespace = options.namespace;
			Gateway[options.namespace][action.action.name] = Gateway.request.bind(Gateway, action);
		});
	},

	adapter(adapters) {
		// TODO: verifications conflicts etc
		Gateway.adapters = adapters;
	},

	request(options, obj) {
		debug(options, obj);
		const requestAdapter = Gateway.adapters[options.namespace][options.action.name] ? Gateway.adapters[options.namespace][options.action.name].request : false;
		const responseAdapter = Gateway.adapters[options.namespace][options.action.name] ? Gateway.adapters[options.namespace][options.action.name].response : false;
		const optionsAPI = {
			pathname: S(options.pathname).template(obj).s,
			method: options.action.method
		};
		if (obj && options.schema) {
			optionsAPI.data = {
				data: requestAdapter ? requestAdapter(obj) : obj,
				schema: options.schema
			}
		}
		debug(optionsAPI);
		if (responseAdapter) {
			return RestAPI.apiCallAuth(optionsAPI).then(responseAdapter);
		}
		return RestAPI.apiCallAuth(optionsAPI);
	}

};

module.exports = Gateway;

/* global FormData */
'use strict';

// Vendor
import str from 'string';
const debug = require('debug')('AiC:Libs:Gateway');

// APP
import RestAPI from 'app/libs/rest-api';

const Gateway = {

	register(options) {
		debug('register', options);
		Gateway[options.namespace] = Gateway[options.namespace] || {};
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
		const schemaAdapter = Gateway.adapters[options.namespace][options.action.name] ? Gateway.adapters[options.namespace][options.action.name].schema : false;
		const optionsAPI = {
			pathname: str(options.pathname).template(obj).s,
			method: options.action.method
		};
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
			return RestAPI.apiCallAuth(optionsAPI).then(responseAdapter);
		}
		return RestAPI.apiCallAuth(optionsAPI);
	}

};

module.exports = Gateway;

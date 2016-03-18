'use strict';

const GatewaySchemas = {
	projects: {
		type: 'object', strict: true,
		properties: {
			project_name: {type: 'string'} // eslint-disable-line camelcase
		}
	}
};

module.exports = GatewaySchemas;

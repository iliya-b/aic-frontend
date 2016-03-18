'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the schemes passed to back-end

const GatewaySchemas = {
	projects: {
		type: 'object', strict: true,
		properties: {
			project_name: {type: 'string'} // eslint-disable-line camelcase
		}
	},
	userLogin: {
		type: 'object', strict: true,
		properties: {
			username: {type: 'string', rules: ['trim']},
			password: {type: 'string'}
		}
	},
	live: {
		type: 'object', strict: true,
		properties: {
			image: {type: 'string'},
			project_id: {type: 'string'} // eslint-disable-line camelcase
		}
	}
};

module.exports = GatewaySchemas;

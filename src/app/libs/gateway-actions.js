'use strict';

// Gateway actions to be used to register back-end API endpoints

const GatewayActions = {
	list: {
		name: 'list',
		method: 'GET'
	},
	create: {
		name: 'create',
		method: 'POST'
	},
	read: {
		name: 'read',
		method: 'GET'
	},
	update: {
		name: 'update',
		method: 'PUT'
	},
	delete: {
		name: 'delete',
		method: 'DELETE'
	},
	login: {
		name: 'login',
		method: 'POST'
	},
	logout: {
		name: 'logout',
		method: 'POST'
	},
	upload: {
		name: 'upload',
		method: 'POST',
		fileUpload: true
	}
};

module.exports = GatewayActions;

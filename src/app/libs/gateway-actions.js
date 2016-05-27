'use strict';

// Gateway actions to be used to register back-end API endpoints

const GatewayActions = {
	// Generic actions
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
	// User actions
	login: {
		name: 'login',
		method: 'POST'
	},
	logout: {
		name: 'logout',
		method: 'POST'
	},
	// APKs
	upload: {
		name: 'upload',
		method: 'POST',
		fileUpload: true
	},
	// Live
	installAPK: {
		name: 'installAPK',
		method: 'POST'
	},
	sensor: {
		name: 'sensor',
		method: 'POST'
	},
	listPackages: {
		name: 'listPackages',
		method: 'GET'
	},
	monkeyRunner: {
		name: 'monkeyRunner',
		method: 'POST'
	},
	properties: {
		name: 'properties',
		method: 'GET'
	},
	totp: {
		name: 'totp',
		method: 'GET'
	}
};

module.exports = GatewayActions;

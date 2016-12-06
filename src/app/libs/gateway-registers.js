'use strict';
// Back-end API endpoints

// APP
import Gateway from 'app/libs/gateway';
import GatewayAdapters from 'app/libs/gateway-adapters';
import GatewaySchemas from 'app/libs/gateway-schemas';
import GatewayActions from 'app/libs/gateway-actions';
import RestAPI from 'app/libs/rest-api';

const GatewayRegisters = function () {
	// Register all adapters
	Gateway.adapter(GatewayAdapters);

	// Register request api to be used
	// default is used by all calls that are not otherwise specified
	Gateway.requestAPI.default = RestAPI.apiCallAuth.bind(RestAPI);
	Gateway.requestAPI.authNotRequired = RestAPI.apiCall.bind(RestAPI);

	// APP Configuration
	Gateway.register({
		namespace: 'config',
		actions: [
			{
				action: GatewayActions.read,
				// Note that here is not pathname but URL property
				// because we are getting the configuration of front-end from
				// same domain that APP is being served and NOT from the
				// back-end domain
				url: 'config.json',
				requestAPI: 'authNotRequired'
			}
		]
	});

	// User
	Gateway.register({
		namespace: 'user',
		actions: [
			{
				action: GatewayActions.login,
				pathname: '/user/login',
				schema: GatewaySchemas.userLogin,
				requestAPI: 'authNotRequired'
			}, {
				action: GatewayActions.logout,
				pathname: '/user/logout'
			}, {
				action: {
					name: 'quota',
					method: 'GET'
				},
				pathname: '/user/quota'
			}
		]
	});

	// Projects
	Gateway.register({
		namespace: 'projects',
		actions: [
			{
				action: GatewayActions.list,
				pathname: '/projects'
			}, {
				action: GatewayActions.create,
				pathname: '/projects',
				schema: GatewaySchemas.projects
			}, {
				action: GatewayActions.update,
				pathname: '/projects/{id}', // TODO: change to projectId
				schema: GatewaySchemas.projects
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{id}'
			}, {
				action: GatewayActions.read,
				pathname: '/projects/{projectId}'
			}
		]
	});

	// APKs
	Gateway.register({
		namespace: 'apks',
		actions: [
			{
				action: GatewayActions.list,
				pathname: '/projects/{projectId}/apk'
			}, {
				action: GatewayActions.upload,
				pathname: '/projects/{projectId}/apk',
				allowMany: true
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{projectId}/apk/{apkId}',
				allowMany: true
			}, {
				action: GatewayActions.compile,
				pathname: '/projects/{projectId}/apkcc',
				allowMany: true
			}
		]
	});

	// Tests
	Gateway.register({
		namespace: 'tests',
		actions: [
			{
				action: GatewayActions.list,
				pathname: '/projects/{projectId}/testsources'
			}, {
				action: GatewayActions.upload,
				pathname: '/projects/{projectId}/testsources',
				allowMany: true
			}, {
				action: GatewayActions.update,
				pathname: '/projects/{projectId}/testsources/{testId}'
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{projectId}/testsources/{testId}',
				allowMany: true
			}, {
				action: GatewayActions.download,
				pathname: '/projects/{projectId}/testsources/{testId}',
				responseType: 'text'
			}, {
				action: GatewayActions.show,
				pathname: '/projects/{projectId}/testsources/{testId}/metadata'
			}, {
				action: {
					name: 'compile',
					method: 'POST'
				},
				pathname: '/projects/{projectId}/testsources/{testId}/apk'
			}
		]
	});

	// Camera
	Gateway.register({
		namespace: 'camera',
		actions: [
			{
				action: GatewayActions.list,
				pathname: '/projects/{projectId}/camera'
			}, {
				action: GatewayActions.upload,
				pathname: '/projects/{projectId}/camera',
				allowMany: true
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{projectId}/camera/{cameraFileId}',
				allowMany: true
			}
		]
	});

	// Live
	Gateway.register({
		namespace: 'live',
		actions: [
			{
				action: GatewayActions.list,
				pathname: '/android'
			}, {
				action: GatewayActions.create,
				pathname: '/android',
				schema: GatewaySchemas.live
			}, {
				action: GatewayActions.delete,
				pathname: '/android/{avmId}'
			}, {
				action: GatewayActions.read,
				pathname: '/android/{avmId}'
			}, {
				action: GatewayActions.installAPK,
				pathname: '/android/{avmId}/apk/{apkId}'
			}, {
				action: GatewayActions.sensor,
				pathname: '/android/sensors/{sensor}/{avmId}',
				schema: GatewaySchemas.sensors
			}, {
				action: GatewayActions.listPackages,
				pathname: '/android/{avmId}/apk'
				// placeholder: () => Promise.reject()
			}, {
				action: GatewayActions.monkeyRunner,
				pathname: '/android/{avmId}/monkey',
				schema: GatewaySchemas.monkeyRunner
			}, {
				action: GatewayActions.properties,
				pathname: '/android/{avmId}/properties'
			}, {
				action: GatewayActions.totp,
				pathname: '/android/{avmId}/totp'
			}, {
				action: GatewayActions.listTests,
				pathname: '/android/{avmId}/testrun'
			}, {
				action: GatewayActions.runTest,
				pathname: '/android/{avmId}/testrun?package={....}'
			}, {
				action: GatewayActions.execStatus,
				pathname: '/android/{avmId}/exec/{execId}'
			}, {
				// TODO: create another namespace for images
				action: {
					name: 'listImages',
					method: 'GET'
				},
				pathname: '/images'
			}, {
				action: {
					name: 'command',
					method: 'GET'
				},
				pathname: '/android/{avmId}/command/{commandId}'
			}
		]
	});

	// Test Campaign
	Gateway.register({
		namespace: 'campaign',
		actions: [
			{
				action: {name: 'list', method: 'GET'},
				pathname: '/projects/{projectId}/campaigns'
			}, {
				action: {name: 'create', method: 'POST'},
				pathname: '/projects/{projectId}/campaigns',
				schema: GatewaySchemas.campaign
			}, {
				action: {name: 'read', method: 'GET'},
				pathname: '/projects/{projectId}/campaigns/{campaignId}'
			}, {
				action: {name: 'machines', method: 'GET'},
				pathname: '/android'
			}
		]
	});

	// Xtext
	Gateway.register({
		namespace: 'xtext',
		actions: [
			{
				action: {name: 'validate', method: 'GET'},
				pathname: '/xtext/validate',
				search: 'resource={resourceId}'
			}, {
				action: {name: 'update', method: 'PUT'},
				pathname: '/xtext/update',
				search: 'resource={resourceId}'
			}
		]
	});
};

module.exports = GatewayRegisters;

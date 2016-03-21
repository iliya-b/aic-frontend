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
				placeholder: () => {
					return Promise.resolve({});
				}
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
				pathname: '/projects/{id}',
				schema: GatewaySchemas.projects
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{id}'
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
				pathname: '/projects/{projectId}/apk'
			}, {
				action: GatewayActions.delete,
				pathname: '/projects/{projectId}/apk/{apkId}'
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
			}
		]
	});
};

module.exports = GatewayRegisters;

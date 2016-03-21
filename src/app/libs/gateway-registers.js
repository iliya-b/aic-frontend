'use strict';

// Back-end API endpoints

// APP
import Gateway from 'app/libs/gateway';
import GatewayAdapters from 'app/libs/gateway-adapters';
import GatewaySchemas from 'app/libs/gateway-schemas';
import GatewayActions from 'app/libs/gateway-actions';

const GatewayRegisters = function () {
	// Register all adapters
	Gateway.adapter(GatewayAdapters);

	// User
	Gateway.register({
		namespace: 'user',
		actions: [
			{
				action: GatewayActions.login,
				pathname: '/user/login',
				schema: GatewaySchemas.userLogin
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
				action: {
					name: 'installAPK',
					method: 'POST'
				},
				pathname: '/android/{avmId}/apk/{apkId}'
			}, {
				action: {
					name: 'sensor',
					method: 'POST'
				},
				pathname: '/android/sensors/{sensor}/{avmId}',
				schema: GatewaySchemas.sensors
			}// , {
			// 	action: {
			// 		name: 'gsm',
			// 		method: 'POST'
			// 	},
			// 	pathname: '/android/sensors/gsm/{action}/{avmId}',
			// 	schema: GatewaySchemas.gsm
			// }
		]
	});
};

module.exports = GatewayRegisters;

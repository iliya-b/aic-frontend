'use strict';

// APP
import Gateway from 'app/libs/gateway';
import GatewayAdapters from 'app/libs/gateway-adapters';
import GatewaySchemas from 'app/libs/gateway-schemas';

const GatewayRegisters = function () {
	// Register all adapters
	Gateway.adapter(GatewayAdapters);

	// User
	Gateway.register({
		namespace: 'user',
		actions: [
			{
				action: Gateway.actions.login,
				pathname: '/user/login',
				schema: GatewaySchemas.userLogin
			}, {
				action: Gateway.actions.logout,
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
				action: Gateway.actions.list,
				pathname: '/projects'
			}, {
				action: Gateway.actions.create,
				pathname: '/projects',
				schema: GatewaySchemas.projects
			}, {
				action: Gateway.actions.update,
				pathname: '/projects/{id}',
				schema: GatewaySchemas.projects
			}, {
				action: Gateway.actions.delete,
				pathname: '/projects/{id}'
			}
		]
	});

	// APKs
	Gateway.register({
		namespace: 'apks',
		actions: [
			{
				action: Gateway.actions.list,
				pathname: '/projects/{projectId}/apk'
			}, {
				action: Gateway.actions.upload,
				pathname: '/projects/{projectId}/apk'
			}, {
				action: Gateway.actions.delete,
				pathname: '/projects/{projectId}/apk/{apkId}'
			}
		]
	});

	// Live
	Gateway.register({
		namespace: 'live',
		actions: [
			{
				action: Gateway.actions.list,
				pathname: '/android'
			}, {
				action: Gateway.actions.create,
				pathname: '/android',
				schema: GatewaySchemas.projects
			}, {
				action: Gateway.actions.delete,
				pathname: '/android/{id}'
			}
		]
	});
};

module.exports = GatewayRegisters;

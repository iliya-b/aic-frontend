'use strict';

// APP
import Gateway from 'app/libs/gateway';
import GatewayAdapters from 'app/libs/gateway-adapters';
import GatewaySchemas from 'app/libs/gateway-schemas';

const GatewayRegisters = function () {
	// Register all adapters
	Gateway.adapter(GatewayAdapters);

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
};

module.exports = GatewayRegisters;

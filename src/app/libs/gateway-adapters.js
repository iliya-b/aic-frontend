'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the converters from back-end

// Adapters convert the objects retrieved by API to the objects
// expected by front-end

const GatewayAdapters = {
	projects: {
		list: {
			response: result => {
				return result.projects.map(backendObject => {
					return {
						id: backendObject.project_id,
						name: backendObject.project_name
					};
				});
			}
		},
		create: {
			request: frontendObject => {
				return {
					project_name: frontendObject.name // eslint-disable-line camelcase
				};
			}
		},
		update: {
			request: frontendObject => {
				return {
					project_name: frontendObject.name // eslint-disable-line camelcase
				};
			}
		}
	},
	apks: {
		list: {
			response: data => {
				return data.apks.map(apk => {
					return {
						id: apk.apk_id,
						filename: apk.apk_filename,
						status: apk.status
					};
				});
			}
		}
	},
	live: {
		list: {
			response: data => {
				return data.avms.map(avm => {
					return {
						avm_id: avm.avm_id, // eslint-disable-line camelcase
						avm_owner: avm.avm_owner, // eslint-disable-line camelcase
						image: avm.image,
						avm_novnc_host: avm.novnc_host, // eslint-disable-line camelcase
						avm_novnc_port: avm.novnc_port, // eslint-disable-line camelcase
						project_id: avm.project_id, // eslint-disable-line camelcase
						stack_name: avm.stack_name, // eslint-disable-line camelcase
						avm_status: avm.status, // eslint-disable-line camelcase
						ts_created: avm.ts_created // eslint-disable-line camelcase
					};
				});
			}
		},
		create: {
			request: frontendObject => {
				return {
					image: frontendObject.variant,
					project_id: frontendObject.projectId // eslint-disable-line camelcase
				};
			}
		},
		sensor: {
			request: frontendObject => {
				return frontendObject.payload;
			},
			schema: (options, frontendObject) => {
				return options.schema[frontendObject.sensor];
			}
		}
	}
};

module.exports = GatewayAdapters;

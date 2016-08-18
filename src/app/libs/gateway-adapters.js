'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the converters from back-end

// Adapters convert the objects retrieved by API to the objects
// expected by front-end

const GatewayAdapters = {
	user: {
		login: {
			request: frontendObject => {
				return {
					username: frontendObject.login,
					password: frontendObject.pass
				};
			}
		}
	},
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
						id: apk.file_id,
						filename: apk.filename,
						status: apk.status
					};
				});
			}
		}
	},
	tests: {
		list: {
			response: data => {
				return data.tests.map(test => {
					return {
						id: test.file_id,
						filename: test.filename,
						status: test.status
					};
				});
			}
		}
	},
	camera: {
		list: {
			response: data => {
				return data.camera_files.map(file => {
					return {
						id: file.file_id,
						filename: file.filename,
						status: file.status
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
						// avm_novnc_host: avm.novnc_host, // eslint-disable-line camelcase
						// avm_novnc_port: avm.novnc_port, // eslint-disable-line camelcase
						project_id: avm.project_id, // eslint-disable-line camelcase
						// stack_name: avm.stack_name, // eslint-disable-line camelcase
						avm_status: avm.status, // eslint-disable-line camelcase
						ts_created: avm.ts_created, // eslint-disable-line camelcase
						avm_name: avm.avm_name // eslint-disable-line camelcase
					};
				});
			}
		},
		create: {
			request: frontendObject => {
				/*
				{
				name: '',
				version: 'kitkat',
				type: 'phone',
				size: '800x600',
				dpi: '120',
				enableSensors: true,
				enableBattery: true,
				enableGps: true,
				enableCamera: true,
				enableRecord: true,
				enableGsm: true,
				enableNfc: true,
				projectId
				uuid
			}
				 */
				const size = frontendObject.size.split('x');
				return {
					image: `${frontendObject.version}-${frontendObject.type}`,
					project_id: frontendObject.projectId, // eslint-disable-line camelcase
					avm_name: frontendObject.name, // eslint-disable-line camelcase
					configuration: {
						enable_sensors: frontendObject.enableSensors ? 1 : 0, // eslint-disable-line camelcase
						enable_battery: frontendObject.enableBattery ? 1 : 0, // eslint-disable-line camelcase
						enable_gps: frontendObject.enableGps ? 1 : 0, // eslint-disable-line camelcase
						enable_camera: frontendObject.enableCamera ? 1 : 0, // eslint-disable-line camelcase
						enable_record: frontendObject.enableRecord ? 1 : 0, // eslint-disable-line camelcase
						enable_gsm: frontendObject.enableGsm ? 1 : 0, // eslint-disable-line camelcase
						enable_nfc: frontendObject.enableNfc ? 1 : 0, // eslint-disable-line camelcase
						width: parseInt(size[0], 10),
						height: parseInt(size[1], 10),
						dpi: parseInt(frontendObject.dpi, 10)
					}
				};
			}
		},
		read: {
			response: res => {
				return {
					avm_id: res.avm.avm_id, // eslint-disable-line camelcase
					avm_owner: res.avm.avm_owner, // eslint-disable-line camelcase
					image: res.avm.image,
					avm_novnc_host: res.avm.novnc_host, // eslint-disable-line camelcase
					avm_novnc_port: res.avm.novnc_port, // eslint-disable-line camelcase
					project_id: res.avm.project_id, // eslint-disable-line camelcase
					stack_name: res.avm.stack_name, // eslint-disable-line camelcase
					avm_status: res.avm.status, // eslint-disable-line camelcase
					ts_created: res.avm.ts_created // eslint-disable-line camelcase
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
		},
		listPackages: {
			response: res => {
				return res.packages.filter(packageName => {
					return !/^jp.co.omronsoft.openwnn|^com.svox.pico|^com\.android\..*|^com\.aicVM\..*|^com\.example\.android\..*|^android$/.test(packageName);
				});
			}
		},
		monkeyRunner: {
			request: frontendObject => {
				return {
					packages: frontendObject.packages, // eslint-disable-line camelcase
					throttle: frontendObject.throttle,
					event_count: frontendObject.eventCount // eslint-disable-line camelcase
				};
			}
		},
		properties: {
			response: backendObject => {
				return backendObject.properties;
			}
		}
	}
};

module.exports = GatewayAdapters;

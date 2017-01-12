'use strict';

// Should avoid to use eslint-disable-line camelcase
// But in this file is OK since we define the converters from back-end

// Adapters convert the objects retrieved by API to the objects
// expected by front-end

import {camelizeObj} from 'app/libs/helpers';

const GatewayAdapters = {
	user: {
		login: {
			request: frontendObject => {
				return {
					username: frontendObject.login,
					password: frontendObject.pass
				};
			}
		},
		quota: {
			response: backendObject => camelizeObj(backendObject.quota)
		}
	},
	projects: {
		list: {
			response: result => {
				return result.projects.map(backendObject => {
					return {
						id: backendObject.project_id,
						name: backendObject.project_name,
						status: backendObject.status
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
		},
		read: {
			response: result => {
				result.project.sum_avms_uptime = typeof result.project.sum_avms_uptime === 'number' ? result.project.sum_avms_uptime : 0; // eslint-disable-line camelcase
				return camelizeObj(result.project);
			}
		}
	},
	apks: {
		list: {
			response: data => {
				return data.apks.map(apk => {
					return {
						id: apk.apk_id,
						filename: apk.filename,
						status: apk.status,
						testsourceId: apk.testsource_id
					};
				});
			}
		}
	},
	tests: {
		list: {
			response: data => {
				return data.testsources.map(test => {
					return {
						apk_id: test.apk_id, // eslint-disable-line camelcase
						filename: test.filename,
						project_id: test.project_id, // eslint-disable-line camelcase
						status: test.status,
						id: test.testsource_id,
						apkStatus: test.apk_status,
						apkStatusReason: test.apk_status_reason
					};
				});
			}
		},
		// download: {
		// 	response:
		// },
		show: {
			response: data => data.testsource
		}
	},
	camera: {
		list: {
			response: data => {
				return data.camera_files.map(file => {
					return {
						id: file.camera_id,
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
						avm_name: avm.avm_name, // eslint-disable-line camelcase
						campaignId: avm.campaign_id
					};
				});
			}
		},
		create: {
			request: frontendObject => {
				const size = frontendObject.size.split('x');
				return {
					image: frontendObject.image,
					project_id: frontendObject.projectId, // eslint-disable-line camelcase
					avm_name: frontendObject.name, // eslint-disable-line camelcase
					hwconfig: {
						enable_sensors: frontendObject.enableSensors ? 1 : 0, // eslint-disable-line camelcase
						enable_battery: frontendObject.enableBattery ? 1 : 0, // eslint-disable-line camelcase
						enable_gps: frontendObject.enableGps ? 1 : 0, // eslint-disable-line camelcase
						enable_camera: frontendObject.enableCamera ? 1 : 0, // eslint-disable-line camelcase
						// enable_record: frontendObject.enableRecord ? 1 : 0, // eslint-disable-line camelcase
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
					avm_name: res.avm.avm_name, // eslint-disable-line camelcase
					image: res.avm.image,
					avm_novnc_host: res.avm.novnc_host, // eslint-disable-line camelcase
					avm_novnc_port: res.avm.novnc_port, // eslint-disable-line camelcase
					project_id: res.avm.project_id, // eslint-disable-line camelcase
					stack_name: res.avm.stack_name, // eslint-disable-line camelcase
					avm_status: res.avm.status, // eslint-disable-line camelcase
					ts_created: res.avm.ts_created, // eslint-disable-line camelcase
					hwconfig: {
						dpi: res.avm.hwconfig.dpi,
						enableBattery: res.avm.hwconfig.enable_battery,
						enableCamera: res.avm.hwconfig.enable_camera,
						enableGps: res.avm.hwconfig.enable_gps,
						enableGsm: res.avm.hwconfig.enable_gsm,
						enableNfc: res.avm.hwconfig.enable_nfc,
						enableRecord: res.avm.hwconfig.enable_record,
						enableSensors: res.avm.hwconfig.enable_sensors,
						height: res.avm.hwconfig.height,
						width: res.avm.hwconfig.width
					}
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
			},
			response: backendObject => ({
				request: backendObject.request,
				response: {
					commandId: backendObject.response.command_id
				}
			})
		},
		runTest: {
			response: backendObject => ({
				request: backendObject.request,
				response: {
					commandId: backendObject.response.command_id
				}
			})
		},
		properties: {
			response: backendObject => {
				return backendObject.properties;
			}
		},
		listImages: {
			response: backendObject => backendObject.images
		},
		installAPK: {
			response: backendObject => ({
				request: backendObject.request,
				response: {
					commandId: backendObject.response.command_id
				}
			})
		},
		command: {
			response: backendObject => backendObject.results[0]
		}
	},
	campaign: {
		list: {
			response: backendObject => backendObject.campaigns
		},
		read: {
			response: backendObject => {
				return {
					id: backendObject.campaign.campaign_id,
					projectId: backendObject.campaign.project_id,
					status: backendObject.campaign.campaign_status,
					progress: backendObject.campaign.progress,
					tests: backendObject.campaign.tests.map(t => {
						return {
							stdout: t.stdout,
							apkPackage: t.package,
							status: t.status,
							image: t.image,
							hwconfig: {
								dpi: t.hwconfig.dpi,
								enableBattery: t.hwconfig.enable_battery,
								enableCamera: t.hwconfig.enable_camera,
								enableGps: t.hwconfig.enable_gps,
								enableGsm: t.hwconfig.enable_gsm,
								enableNfc: t.hwconfig.enable_nfc,
								enableRecord: t.hwconfig.enable_record,
								enableSensors: t.hwconfig.enable_sensors,
								height: t.hwconfig.height,
								width: t.hwconfig.width
							}
						};
					}),
					name: backendObject.campaign.campaign_name
				};
			}
		},
		create: {
			request: frontendObject => {
				return {
					campaign_name: frontendObject.name, // eslint-disable-line camelcase
					tests: frontendObject.devices.map(device => {
						const size = device.size.split('x');
						return {
							image: device.image,
							apks: frontendObject.apks,
							// packages: ['com.zenika.aic.demo.sensor.test/android.support.test.runner.AndroidJUnitRunner', 'com.zenika.aic.core.libs.test/android.test.InstrumentationTestRunner'],
							packages: [],
							hwconfig: {
								enable_sensors: device.enableSensors ? 1 : 0, // eslint-disable-line camelcase
								enable_battery: device.enableBattery ? 1 : 0, // eslint-disable-line camelcase
								enable_gps: device.enableGps ? 1 : 0, // eslint-disable-line camelcase
								enable_camera: device.enableCamera ? 1 : 0, // eslint-disable-line camelcase
								enable_record: frontendObject.enableRecord ? 1 : 0, // eslint-disable-line camelcase
								enable_gsm: device.enableGsm ? 1 : 0, // eslint-disable-line camelcase
								enable_nfc: device.enableNfc ? 1 : 0, // eslint-disable-line camelcase
								width: parseInt(size[0], 10),
								height: parseInt(size[1], 10),
								dpi: parseInt(device.dpi, 10)
							}
						};
					})
				};
			}
		},
		machines: {
			response: backendObject => backendObject.avms.map(camelizeObj)
		}
	},
	xtext: {
		validate: {
			response: backendObject => backendObject.issues.map(issue => ({
				row: (issue.line - 1),
				column: issue.column,
				type: issue.severity,
				text: issue.description
			}))
		}
	}
};

module.exports = GatewayAdapters;

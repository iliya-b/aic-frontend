'use strict';

// Vendors
import sprintf from 'sprintf';
// const debug = require('debug')('AiC:Store:BackendAPI');

// APP
import RestAPI from 'app/libs/rest-api';

const BackendObjects = {

	// Backend URLs

	URLPATH_LOGIN: '/user/login',
	URLPATH_PROJECT_LIST: '/projects',
	URLPATH_PROJECT_SHOW: '/projects/%s',
	URLPATH_APK: '/projects/%s/apk',
	URLPATH_APK_DELETE: '/projects/%s/apk/%s',
	URLPATH_LIVE: '/android',
	URLPATH_LIVE_MACHINE: '/android/%s',
	URLPATH_LIVE_SENSOR: '/android/sensors/%s/%s',
	URLPATH_LIVE_INSTALL_APK: '/android/%s/apk/%s',

	// Validation/Sanitization Objects

	OBJSCHEMA_USER_LOGIN: {type: 'object', strict: true,
		properties: {
			username: {type: 'string', rules: ['trim']},
			password: {type: 'string'}
		}
	},
	OBJSCHEMA_PROJECT: {type: 'object', strict: true,
		properties: {
			project_name: {type: 'string'} // eslint-disable-line camelcase
		}
	},
	OBJSCHEMA_LIVE: {type: 'object', strict: true,
		properties: {
			image: {type: 'string'},
			project_id: {type: 'string'} // eslint-disable-line camelcase
		}
	},
	OBJSCHEMA_SENSOR: {
		accelerometer: {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		battery: {
			type: 'object',
			strict: true,
			properties: {
				level_percent: {type: 'number', min: 0, max: 100}, // eslint-disable-line camelcase
				ac_online: {type: 'integer', min: 0, max: 1} // eslint-disable-line camelcase
			}
		},
		gps: {
			type: 'object',
			strict: true,
			properties: {
				latitude: {type: 'number'},
				longitude: {type: 'number'}
			}
		},
		gravity: {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		gsm: {
			type: 'object',
			strict: true,
			properties: {
				action_type: { // eslint-disable-line camelcase
					enum: ['RECEIVE_CALL', 'ACCEPT_CALL', 'CANCEL_CALL', 'HOLD_CALL', 'RECEIVE_SMS', 'SET_SIGNAL', 'SET_NETWORK_TYPE', 'SET_NETWORK_REGISTRATION']
				},
				phone_number: {type: 'string', optional: true}, // eslint-disable-line camelcase
				sms_text: {type: 'string', optional: true}, // eslint-disable-line camelcase
				signal_strength: {enum: [0, 1, 2, 3, 4], optional: true}, // eslint-disable-line camelcase
				network: {enum: ['umts', 'lte', 'gprs', 'gsm', 'hspa', 'edge', 'cdma', 'evdo', 'hsdpa', 'hsupa', 'full'], optional: true},
				registration: {enum: ['home', 'denied', 'searching', 'roaming', 'none'], optional: true}
			}
		},
		gyroscope: {
			type: 'object',
			strict: true,
			properties: {
				azimuth: {type: 'number'},
				pitch: {type: 'number'},
				roll: {type: 'number'}
			}
		},
		light: {
			type: 'object',
			strict: true,
			properties: {
				light: {type: 'number'}
			}
		},
		linear_acc: { // eslint-disable-line camelcase
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		magnetometer: {
			type: 'object',
			strict: true,
			properties: {
				x: {type: 'number'},
				y: {type: 'number'},
				z: {type: 'number'}
			}
		},
		orientation: {
			type: 'object',
			strict: true,
			properties: {
				azimuth: {type: 'number'},
				pitch: {type: 'number'},
				roll: {type: 'number'}
			}
		},
		pressure: {
			type: 'object',
			strict: true,
			properties: {
				pressure: {type: 'number'}
			}
		},
		proximity: {
			type: 'object',
			strict: true,
			properties: {
				distance: {type: 'number'}
			}
		},
		// TODO: senza does not have schema
		recording: {
			type: 'object',
			strict: true,
			properties: {
				filename: {type: 'string'},
				start: {type: 'integer', min: 0, max: 1}
			}
		},
		relative_humidity: { // eslint-disable-line camelcase
			type: 'object',
			strict: true,
			properties: {
				relative_humidity: {type: 'number'} // eslint-disable-line camelcase
			}
		},
		// TODO: remove system?
		// TODO: senza does not have schema
		system: {
			type: 'object',
			strict: true,
			properties: {
				uid: {type: 'string'},
				command: {type: 'string'},
				params: {type: 'string'}
			}
		},
		temperature: {
			type: 'object',
			strict: true,
			properties: {
				temperature: {type: 'number'}
			}
		}
	}
};

const BackendAPI = {

	// User //

	userLogin(email, pass) {
		const options = {
			pathname: BackendObjects.URLPATH_LOGIN,
			data: {
				data: {username: email, password: pass},
				schema: BackendObjects.OBJSCHEMA_USER_LOGIN
			}
		};
		return RestAPI.apiCall(options);
	},

	userLogout() {
		// const options = {
		// 	pathname: BackendObjects.URLPATH_PROJECT,
		// 	method: 'GET'
		// };
		return Promise.resolve({
		});
		// return RestAPI.apiCallAuth(options);
	},

	isUserLogged(cb) {
		const url = `${this.backendRoot()}/back/project`;
		RestAPI.apiCall(url, undefined, cb, undefined, 'GET', false);
	},

	// LIVE //

	// liveStart(variant, projectId) {
	// 	const data = {
	// 		image: variant,
	// 		project_id: projectId // eslint-disable-line camelcase
	// 	};
	// 	const options = {
	// 		pathname: BackendObjects.URLPATH_LIVE,
	// 		method: 'POST',
	// 		data: {
	// 			data,
	// 			schema: BackendObjects.OBJSCHEMA_LIVE
	// 		}
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	// liveStop(liveId) {
	// 	const options = {
	// 		pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
	// 		method: 'DELETE'
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	// liveCheck(liveId) {
	// 	const options = {
	// 		pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
	// 		method: 'GET'
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	// LIVE SENSORS //

	// sensor(data, sensor, liveId) {
	// 	const options = {
	// 		pathname: sprintf(BackendObjects.URLPATH_LIVE_SENSOR, sensor, liveId),
	// 		method: 'POST',
	// 		data
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	// sensorBattery(_, liveId, value) {
	// 	// TODO: fix arguments
	// 	debug(arguments);
	// 	const data = {
	// 		// data: {level: parseInt(value, 10) * 500000},
	// 		data: {
	// 			level_percent: parseInt(value, 10), // eslint-disable-line camelcase
	// 			ac_online: 1 // eslint-disable-line camelcase
	// 		},
	// 		schema: BackendObjects.OBJSCHEMA_SENSOR_BATTERY
	// 	};
	// 	return this.sensor(data, 'battery', liveId);
	// },

	// sensorAccelerometer(liveId, x, y, z) {
	// 	debug('sensorAccelerometer', arguments);
	// 	const data = {
	// 		data: {x, y, z},
	// 		schema: BackendObjects.OBJSCHEMA_SENSOR_ACCELEROMETER
	// 	};
	// 	return this.sensor(data, 'accelerometer', liveId);
	// },

	// sensorLocation(_, liveId, lat, lon) {
	// 	const data = {
	// 		data: {latitude: lat, longitude: lon},
	// 		schema: BackendObjects.OBJSCHEMA_SENSOR_LOCATION
	// 	};
	// 	return this.sensor(data, 'gps', liveId);
	// },

	// recording(filename, start, liveId) {
	// 	const data = {
	// 		data: {filename, start},
	// 		schema: BackendObjects.OBJSCHEMA_SENSOR_RECORDING
	// 	};
	// 	return this.sensor(data, 'recording', liveId);
	// },

	// setSensor(liveId, sensor, payload) {
	// 	const data = {
	// 		data: payload,
	// 		schema: BackendObjects.OBJSCHEMA_SENSOR[sensor]
	// 	};
	// 	const options = {
	// 		pathname: sprintf(BackendObjects.URLPATH_LIVE_SENSOR, sensor, liveId),
	// 		method: 'POST',
	// 		data
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	// recordingStart(filename, liveId) {
	// 	this.recording(filename, 'true', liveId);
	// },

	// recordingStop(filename, liveId) {
	// 	this.recording(filename, 'false', liveId);
	// },

	// screenshot(filename, liveId) {
	// 	this.recording(filename, 'true', liveId);
	// },

	// liveInstallAPK(projectId, liveId, apkId) {
	// 	const options = {
	// 		pathname: sprintf(BackendObjects.URLPATH_LIVE_INSTALL_APK, liveId, apkId),
	// 		method: 'POST'
	// 	};
	// 	return RestAPI.apiCallAuth(options);
	// },

	loadConfig() {
		const options = {
			url: 'config.json',
			method: 'GET'
		};
		return RestAPI.apiCall(options);
	}

};

module.exports = BackendAPI;

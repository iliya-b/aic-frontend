/* global window, FormData, fetch */
'use strict';

// Vendors
const url = require('url');
const sprintf = require('sprintf');
const debug = require('debug')('AiC:Store:BackendAPI');

debug('fetch', window.fetch);

// APP
const SanitizeObject = require('app/components/libs/sanitize-object');

const BackendObjects = {

	// Backend URLs

	URLPATH_LOGIN: '/user/login',
	URLPATH_PROJECT: '/back/project',
	URLPATH_APK: '/back/application/%s',
	URLPATH_APKTEST: '/back/test/%s',
	URLPATH_LIVE: '/android',
	URLPATH_LIVE_MACHINE: '/android/%s',
	URLPATH_LIVE_SENSOR: '/android/sensors/%s/%s',

	// Validation/Sanitization Objects

	OBJSCHEMA_USER_LOGIN: {type: 'object', strict: true,
		properties: {
			username: {type: 'string', rules: ['trim']},
			password: {type: 'string'}
		}
	},
	OBJSCHEMA_LIVE: {type: 'object', strict: true,
		properties: {
			variant: {type: 'string', optional: true}
		}
	},
	OBJSCHEMA_SENSOR_BATTERY: {type: 'object', strict: true,
		properties: {
			level_percent: {type: 'integer', min: 0, max: 100}, // eslint-disable-line camelcase
			ac_online: {type: 'integer', min: 0, max: 1} // eslint-disable-line camelcase
		}
	},
	OBJSCHEMA_SENSOR_ACCELEROMETER: {type: 'object', strict: true,
		properties: {
			x: {type: 'integer', min: 0, max: 100},
			y: {type: 'integer', min: 0, max: 100},
			z: {type: 'integer', min: 0, max: 100}
		}
	},
	OBJSCHEMA_SENSOR_LOCATION: {type: 'object', strict: true,
		properties: {
			latitude: {type: 'number'},
			longitude: {type: 'number'}
		}
	},
	OBJSCHEMA_SENSOR_RECORDING: {type: 'object', strict: true,
		properties: {
			filename: {type: 'string', rules: ['trim']},
			start: {type: 'boolean'}
		}
	}

};

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}
	const error = new Error(response.statusText);
	error.response = response;
	throw error;
}

function parseJSON(response) {
	return response.json();
}

const BackendAPI = {

	// Core functions

	backendURL(pathname) {
		// TODO: Not the best to have globals
		const options = {
			protocol: window.GobyAppGlobals.config.backend.protocol,
			hostname: window.GobyAppGlobals.config.backend.host,
			port: window.GobyAppGlobals.config.backend.port
		};

		if (typeof pathname !== 'undefined') {
			options.pathname = pathname;
		}

		return url.format(options);
	},

	apiCall(options) {
		// url, data, cb, headers, method, authRequired, file, cbProgress
		options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
		options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
		options.authRequired = (typeof options.authRequired === 'undefined') ? false : options.authRequired;
		if (typeof options.data === 'undefined') {
			options.data = options.rawData || false;
		} else {
			options.data = JSON.stringify(SanitizeObject.sanitizeData(options.data));
		}

		if (options.pathname) {
			options.url = this.backendURL(options.pathname);
		}

		if (!options.url) {
			throw new Error('You must inform a valid URL for request.');
		}

		// Request options
		// const ajaxOptions = {
		// 	url: options.url,
		// 	data: options.data,
		// 	xhrFields: {withCredentials: true},
		// 	method: options.method,
		// 	contentType: 'application/json;charset=UTF-8',
		// 	processData: false,
		// 	dataType: 'json',
		// 	headers: options.headers
		// 	// timeout: AppConfig.config.backend.timeout // TODO: put back timeout
		// };

		// Add options for file upload
		// if (typeof options.file !== 'undefined') {
		//   const formData = new FormData();
		//   formData.append('file', options.file);
		//   ajaxOptions.data = formData;
		//   ajaxOptions.cache = false;
		//   ajaxOptions.contentType = false;
		//   ajaxOptions.type = 'POST';
		//   ajaxOptions.xhr = function () {
		//     // Custom XMLHttpRequest
		//     const myXhr = $.ajaxSettings.xhr();
		//     // Check if upload property exists
		//     if (myXhr.upload) {
		//       // For handling the progress of the upload
		//       myXhr.upload.addEventListener('progress', options.cbProgress, false);
		//     }
		//     return myXhr;
		//   };
		// }

		// Make request
		debug('doing ajax', arguments);

		const myInit = {
			method: options.method,
			headers: options.headers,
			mode: 'cors',
			cache: 'default'
		};

		if (options.data) {
			myInit.body = options.data;
		}

		return new Promise((resolve, reject) => {
			fetch(options.url, myInit)
			// .then((response) => {
			//   debug('return ajax', arguments, response);
			// })
			.then(checkStatus)
			.then(parseJSON)
			.then(data => {
				debug('return ajax', arguments, data);
				console.log('request succeeded with JSON response', data);
				resolve(data);
			})
			.catch(error => {
				console.log('request failed', error);
				reject(null, error, error);
			});
		});
	},

	// // apiCall with jQuery
	// apiCall(options) {
	//   // url, data, cb, headers, method, authRequired, file, cbProgress
	//   options.method = (typeof options.method === 'undefined') ? 'POST' : options.method;
	//   options.headers = (typeof options.headers === 'undefined') ? {} : options.headers;
	//   options.authRequired = (typeof options.authRequired === 'undefined') ? true : options.authRequired;
	//   options.data = (typeof options.data === 'undefined') ? '' : JSON.stringify(SanitizeObject.sanitizeData(options.data));

	//   if (options.pathname) {
	//     options.url = this.backendURL(options.pathname);
	//   }

	//   if (!options.url) {
	//     throw new Error('You must inform a valid URL for request.');
	//   }

	//   // Request options
	//   const ajaxOptions = {
	//     url: options.url,
	//     data: options.data,
	//     xhrFields: {withCredentials: true},
	//     method: options.method,
	//     contentType: 'application/json;charset=UTF-8',
	//     processData: false,
	//     dataType: 'json',
	//     headers: options.headers,
	//     // timeout: AppConfig.config.backend.timeout // TODO: put back timeout
	//   };

	//   // Add options for file upload
	//   if (typeof options.file !== 'undefined') {
	//     const formData = new FormData();
	//     formData.append('file', options.file);
	//     ajaxOptions.data = formData;
	//     ajaxOptions.cache = false;
	//     ajaxOptions.contentType = false;
	//     ajaxOptions.type = 'POST';
	//     ajaxOptions.xhr = function () {
	//       // Custom XMLHttpRequest
	//       const myXhr = $.ajaxSettings.xhr();
	//       // Check if upload property exists
	//       if (myXhr.upload) {
	//         // For handling the progress of the upload
	//         myXhr.upload.addEventListener('progress', options.cbProgress, false);
	//       }
	//       return myXhr;
	//     };
	//   }

	//   // Make request
	//   return new Promise(resolve => {
	//     $.ajax(ajaxOptions)
	//     .always(function (data, textStatus, errorThrown) {
	//       // User is not logged in
	//       if (options.authRequired && textStatus === 'error' && errorThrown === 'Unauthorized') {
	//         // TODO: Must be changed to state etc...
	//         const {AuthActions} = require('app/actions');
	//         AuthActions.logout.completed();
	//       }
	//       debug('return ajax', arguments);
	//       resolve(data, textStatus, errorThrown);
	//     });
	//   });
	// },

	apiCallAuth(options) {
		const {AuthActions} = require('app/actions');
		options.headers = options.headers ? options.headers : {};
		options.headers.Authorization = sprintf(' Bearer %s', AuthActions.getToken());
		options.authRequired = true;
		return this.apiCall(options);
	},

	// User //

	userLogin(email, pass) {
		const options = {
			pathname: BackendObjects.URLPATH_LOGIN,
			data: {
				data: {username: email, password: pass},
				schema: BackendObjects.OBJSCHEMA_USER_LOGIN
			}
		};
		return this.apiCall(options);
	},

	userLogout() {
		// const options = {
		// 	pathname: BackendObjects.URLPATH_PROJECT,
		// 	method: 'GET'
		// };
		return Promise.resolve({
		});
		// return this.apiCallAuth(options);
	},

	userProjects() {
		// const options = {
		// 	pathname: BackendObjects.URLPATH_PROJECT,
		// 	method: 'GET'
		// };
		return Promise.resolve({
			tenants: [{
				description: 'test\'s project',
				enabled: true,
				id: 'a532574a46954bf3a85dd6284ed8f5e8',
				name: 'test'}],
			tenants_links: [] // eslint-disable-line camelcase
		});
		// return this.apiCallAuth(options);
	},

	// APKs //

	isUserLogged(cb) {
		const url = `${this.backendRoot()}/back/project`;
		this.apiCall(url, undefined, cb, undefined, 'GET', false);
	},

	apkList(projectId) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_APK, projectId),
			method: 'GET'
		};
		return this.apiCallAuth(options);
	},

	apkUpload(projectId, file, cbProgress) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_APK, projectId),
			method: 'POST',
			file,
			cbProgress
		};
		return this.apiCallAuth(options);
	},

	// LIVE //

	liveList() {
		const options = {
			pathname: BackendObjects.URLPATH_LIVE,
			method: 'GET'
		};
		return this.apiCallAuth(options);
	},

	liveStart(variant) {
		// TODO: should not be raw data
		const data = new FormData();
		// data.append('variant', 'opengl');
		data.append('variant', variant);
		const options = {
			pathname: BackendObjects.URLPATH_LIVE,
			method: 'POST',
			rawData: data
			// data: {
			//   data: {variant: 'opengl'},
			//   schema: BackendObjects.OBJSCHEMA_LIVE,
			// }
		};
		return this.apiCallAuth(options);
	},

	liveStop(liveId) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
			method: 'DELETE'
		};
		return this.apiCallAuth(options);
	},

	liveCheck(liveId) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_LIVE_MACHINE, liveId),
			method: 'GET'
		};
		return this.apiCallAuth(options);
	},

	// LIVE SENSORS //

	sensor(data, sensor, liveId) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_LIVE_SENSOR, sensor, liveId),
			method: 'POST',
			data
		};
		return this.apiCallAuth(options);
	},

	sensorBattery(_, liveId, value) {
		// TODO: fix arguments
		console.warn(arguments);
		const data = {
			// data: {level: parseInt(value, 10) * 500000},
			data: {
				level_percent: parseInt(value, 10), // eslint-disable-line camelcase
				ac_online: 1 // eslint-disable-line camelcase
			},
			schema: BackendObjects.OBJSCHEMA_SENSOR_BATTERY
		};
		return this.sensor(data, 'battery', liveId);
	},

	sensorAccelerometer(x, y, z, liveId) {
		const data = {
			data: {x, y, z},
			schema: BackendObjects.OBJSCHEMA_SENSOR_ACCELEROMETER
		};
		return this.sensor(data, 'accelerometer', liveId);
	},

	sensorLocation(lat, lon, liveId) {
		const data = {
			data: {latitude: lat, longitude: lon},
			schema: BackendObjects.OBJSCHEMA_SENSOR_LOCATION
		};
		return this.sensor(data, 'location', liveId);
	},

	recording(filename, start, liveId) {
		const data = {
			data: {filename, start},
			schema: BackendObjects.OBJSCHEMA_SENSOR_RECORDING
		};
		return this.sensor(data, 'recording', liveId);
	},

	recordingStart(filename, liveId) {
		this.recording(filename, 'true', liveId);
	},

	recordingStop(filename, liveId) {
		this.recording(filename, 'false', liveId);
	},

	screenshot(filename, liveId) {
		this.recording(filename, 'true', liveId);
	},

	// NOT IMPLEMENTED ON MICROSERVICES //

	// APKs Test //

	apkTestList(projectId) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_APKTEST, projectId),
			method: 'GET'
		};
		return this.apiCallAuth(options);
	},

	apkTestUpload(projectId, file, cbProgress) {
		const options = {
			pathname: sprintf(BackendObjects.URLPATH_APKTEST, projectId),
			method: 'POST',
			file,
			cbProgress
		};
		return this.apiCallAuth(options);
	},

	// TODO: remove
	loadConfig(cb) {
		const url = 'config.json';
		this.apiCall(url, undefined, cb, undefined, 'GET', false);
	}
	// OLD CODE //

	// instanceList(token, cb) {
	//   // on success
	//   //    {'results':[['330cd3fb-73f7-4e20-a9b4-9c2a05d91e9f','nexus']]}
	//   const url = this.backendRoot() + '/back/stack';
	//   this.apiCallAuth(url, null, cb, token, 'GET');
	// },

	// testCreate(token, projectId, instanceId, instanceName, APKIds, APKTestIds, cb) {
	//   // on success
	//   //
	//   // on error
	//   //     {'error':{'code':409,'message':'Conflict','description':'}}
	//   // var url = this.backendRoot() + '/back/stack';
	//   // var APKIdsFlatten = APKIds.length ? ''' + APKIds.join('','') + ''' : '';
	//   // var APKTestIdsFlatten = APKTestIds.length ? ''' + APKTestIds.join('','') + ''' : '';
	//   // var data = '{'tenantId':''+projectId+'','stackName':''+instanceName+'','stackId':''+instanceId+'','appIds':['+APKIdsFlatten+'],'testIds':['+APKTestIdsFlatten+']}';
	//   // this.apiCallAuth(url, data, cb, token);
	// },

};

module.exports = BackendAPI;

/* global window, RFB, $D, WebSocket, Util, $, document */
'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Live:Actions');

// APP
import Gateway from 'app/libs/gateway';

// Actions
const LiveActions = Reflux.createActions({
	setProjectId: {children: ['completed', 'failure']},
	loadState: {},
	loadInfo: {children: ['completed', 'failure']},
	setState: {},
	liveReset: {},
	setDelayedRotation: {},
	socketMessage: {},
	logMessage: {},
	start: {children: ['completed', 'failure']},
	stop: {children: ['completed', 'failure']},
	liveCheck: {children: ['completed', 'failure']},
	liveStart: {children: ['completed', 'failure']},
	liveConnect: {children: ['completed', 'failure']},
	liveStop: {asyncResult: true},
	setSensor: {asyncResult: true},
	// setSensorBattery: {asyncResult: true},
	// setSensorAccelerometer: {asyncResult: true},
	// setSensorLocation: {asyncResult: true},
	recordStart: {asyncResult: true},
	recordStop: {asyncResult: true},
	screenshot: {asyncResult: true},
	installAPK: {asyncResult: true},
	listPackages: {asyncResult: true},
	monkeyRunner: {asyncResult: true},
	properties: {children: ['completed', 'failure']}
});

// Listeners for asynchronous Backend API calls

LiveActions.setProjectId.listen(function () {
	LiveActions.tryLoadNoVNC(res => {
		if (res.success) {
			this.completed();
		} else {
			this.failure(res.errorMessage);
		}
	});
});

LiveActions.start.listen(function (variant, projectId, version) {
	debug('start called');
	Gateway.live.create({variant, projectId, version})
	// BackendAPI.liveStart(variant, projectId)
	.then(res => {
		debug('start back');
		debug(arguments);
		if (res.hasOwnProperty('avm_id')) {
			this.completed(res);
		} else {
			this.failure('It was not possible to start live session.');
		}
	});
});

LiveActions.stop.listen(function (avmId) {
	debug('stop called');
	// BackendAPI.liveStop(avmId)
	Gateway.live.delete({avmId})
	.then(() => {
		debug('stop back');
		debug(arguments);
		this.completed();
	})
	.catch(err => {
		debug('stop back catch');
		debug(arguments);
		this.failure(err);
	});
	// [undefined, 'nocontent', Object]0: undefined1: 'nocontent'2: Objectabort: (a)always: ()complete: ()done: ()error: ()fail: ()getAllResponseHeaders: ()getResponseHeader: (a)overrideMimeType: (a)pipe: ()progress: ()promise: (a)readyState: 4responseText: 'setRequestHeader: (a,b)state: ()status: 204statusCode: (a)statusText: 'No Content'success: ()then: ()__proto__: Objectcallee: (...)get callee: ThrowTypeError()set callee: ThrowTypeError()caller: (...)get caller: ThrowTypeError()set caller: ThrowTypeError()length: 3Symbol(Symbol.iterator): values()__proto__: Object
	// [Object, 'error', 'Not Found'] +1ms
	// .then(res => {
	//   debug('stop back');
	//   debug(res);
	//   if (res.hasOwnProperty('avm_id')) {
	//     this.completed(res);
	//   } else {
	//     this.failure('It was not possible to stop live session.');
	//   }
	// });
});

LiveActions.loadInfo.listen(function (avmId) {
	debug('load info called');
	Gateway.live.read({avmId})
	.then(result => {
		this.completed(result);
	}, (err, e1, e2) => {
		debug('loadInfo err', arguments, err, e1, e2);
		this.failure(err);
	});
	// .then(res => {
	// 	debug('back');
	// 	if (res instanceof Array) {
	// 		const avmInfo = res.filter(currentValue => {
	// 			return currentValue.avm_id === avmId;
	// 		});
	// 		if (avmInfo.length) {
	// 			this.completed(avmInfo[0]);
	// 		} else {
	// 			this.failure('It was not possible to find live session.');
	// 		}
	// 	} else {
	// 		this.failure('It was not possible to list live sessions.');
	// 	}
	// });
});

LiveActions.liveCheck.listen(() => {
	// const token = '';
	// Gateway.live.read({avmId})
	// // BackendAPI.liveCheck(token, res => {
	// 	if (res.hasOwnProperty('token')) {
	// 		const WebsocketActions = require('app/actions/websocket');
	// 		WebsocketActions.connect(res.token, 'live');
	// 	} else {
	// 		this.failure('It was not possible to check for a live session.');
	// 	}
	// 	// this.completed( res.error !== 'not-found' );
	// });
});

// Out of date, now it is done by websocket message
// BUT it should be reversed when websocket turn to be only notification
// LiveActions.liveStart.listen(function () {
//   const token = '';
//   BackendAPI.liveStart(token, res => {
//     debug(res);
//     if (res.hasOwnProperty('responseJSON') ) {
//       res = res.responseJSON;
//     }
//     debug(res);
//     if (res.hasOwnProperty('vncip') && res.hasOwnProperty('vncport') ) {
//       this.completed( res.vncip, res.vncport );
//     }else{
//       if ( res.hasOwnProperty('error') && res.error.hasOwnProperty('message')  ) {
//         this.failure( res.error.message );
//       }else{
//         this.failure( 'Error on the create session request.' );
//       }
//     }
//   });
// });

LiveActions.liveConnect.listen(function (vmhost, vmport) {
	// TODO: audio vmport must be informed

	LiveActions.tryConnection(vmhost, vmport, res => {
		if (res.success) {
			this.completed();
			// LiveActions.tryAudioConnection( vmhost, vmport+1000, res => {
			//   // TODO: Promise all
			//   if (res.success) {
			//     this.completed();
			//   }else{
			//     this.failure(res.errorMessage);
			//   }
			//   return false;
			// } );
		} else {
			this.failure(res.errorMessage);
		}
	});
});

LiveActions.liveStop.listen(function (avmId) {
	const WebsocketActions = require('app/actions/websocket');
	WebsocketActions.close();
	if (window.rfb) {
		window.rfb.disconnect();
	}
	Gateway.live.delete({avmId})
	.then(result => {
		this.completed(result);
	}, err => {
		this.failure(err);
	});
	// BackendAPI.liveStop(avmId, res => {
	// 	this.completed(res);
	// });
	// TODO: Call disconnect from noNVC if connected before

	LiveActions.stopAudioConnection();
});

// LiveActions.setSensorBattery.listen(function (projectId, value) {
// 	const token = '';
// 	BackendAPI.sensorBattery(token, projectId, value, res => {
// 		this.completed(res);
// 	});
// });

// LiveActions.setSensorAccelerometer.listen(function (liveId, x, y, z) {
// 	BackendAPI.sensorAccelerometer(liveId, x, y, z, res => {
// 		this.completed(res);
// 	});
// });

// LiveActions.setSensorLocation.listen(function (projectId, lat, lon) {
// 	const token = '';
// 	BackendAPI.sensorLocation(token, projectId, lat, lon, res => {
// 		this.completed(res);
// 	});
// });

LiveActions.setSensor.listen(function (avmId, sensor, payload) {
	Gateway.live.sensor({avmId, sensor, payload})
	.then(res => {
		this.completed(res);
	}, err => {
		this.failure(err);
	});
	// BackendAPI.setSensor(avmId, sensor, payload, res => {
	// 	this.completed(res);
	// });
});

// LiveActions.recordStart.listen(function (projectId) {
// 	const token = '';
// 	const filename = LiveActions.createVideoName();
// 	BackendAPI.recordingStart(token, projectId, filename, res => {
// 		res.filename = filename;
// 		this.completed(res);
// 	});
// });

// LiveActions.recordStop.listen(function (projectId, filename) {
// 	const token = '';
// 	BackendAPI.recordingStop(token, projectId, filename, res => {
// 		this.completed(res);
// 	});
// });

// LiveActions.screenshot.listen(function (projectId, filename) {
// 	const token = '';
// 	// const filename = LiveActions.createImageName();
// 	BackendAPI.screenshot(token, projectId, filename, res => {
// 		this.completed(res);
// 	});
// });

LiveActions.installAPK.listen(function (projectId, avmId, apkId, refId) {
	Gateway.live.installAPK({avmId, apkId})
	.then(res => {
		this.completed(res, projectId, avmId, apkId, refId);
	}, err => {
		this.failed(err, projectId, avmId, apkId, refId);
	});
	// BackendAPI.liveInstallAPK(projectId, avmId, apkId, res => {
	// 	this.completed(res);
	// });
});

// LiveActions.createFileName = function (beginWith, endWith) {
// 	return beginWith + Date.now() + endWith;
// };

// LiveActions.createVideoName = function () {
// 	return this.createFileName('video', '.mp4');
// };

// LiveActions.createImageName = function () {
// 	return this.createFileName('snap', '.bmp');
// };

window.onscriptsload = function () {
	// const updateState = function (rfb, state, oldstate, msg) {
	const updateState = function (rfb, state) {
		debug('rfb updateState');
		debug(arguments);
		if (state === 'normal') {
			window.AiClive.completed = true;
			LiveActions.logMessage('noVNC utils loaded.');
			LiveActions.liveConnect.completed();
		}
	};
	try {
		LiveActions.logMessage('Creating noVNC client.');
		window.rfb = new RFB({target: $D('noVNC_canvas'), onUpdateState: updateState});
	} catch (exc) {
		window.AiClive.completed = true;
		LiveActions.logMessage('Unable to create noVNC client.');
		LiveActions.liveConnect.failure(`Unable to create noVNC client (${exc}).`);
	}
	LiveActions.tryWebsocket();
};

LiveActions.tryWebsocket = function () {
	try {
		LiveActions.logMessage('Connecting to VNC session.');
		window.AiClive.socket = new WebSocket(`ws://${window.AiClive.host}:${window.AiClive.port}`, 'base64');
		window.AiClive.socket.onerror = function () {
			debug('socket test on error');
			debug(arguments);
			debug(LiveActions);
			if (window.AiClive.errorCount >= window.AiClive.maxTries) {
				window.AiClive.completed = true;
				LiveActions.logMessage('Unable to connect session (websockify error).');
				LiveActions.liveConnect.failure('Unable to connect session (websockify error).');
			} else {
				window.AiClive.errorCount += 1;
				setTimeout(() => {
					LiveActions.tryWebsocket();
				}, 2000 * window.AiClive.errorCount);
			}
		};
		// window.AiClive.socket.onopen = function (event) {
		window.AiClive.socket.onopen = function () {
			debug('socket test on open');
			debug(LiveActions);
			window.AiClive.socket.close();
			window.rfb.connect(window.AiClive.host, window.AiClive.port, window.AiClive.password, window.AiClive.path);
		};
		// window.AiClive.socket.onclose = function (event) {
		window.AiClive.socket.onclose = function () {
			debug('socket test on close');
		};
	} catch (exc) {
		// ignore errors
	}
};

LiveActions.tryConnection = function (vmhost, vmport) {
	// This is noVNC dependent
	window.INCLUDE_URI = '/noVNC/';
	// FIXME: probably not the best way to set global var.
	window.AiClive = {
		host: vmhost,
		port: vmport,
		password: '',
		path: 'websockify',
		socket: null,
		// first try instantly, second on +2s, third on +4s... +6
		maxTries: 3,
		errorCount: 0,
		timeout: 15000,
		completed: false,
		timeoutcb: null
	};

	LiveActions.logMessage('Loading noVNC utils.');
	// Load supporting scripts
	// Util.load_scripts(['webutil.js', 'base64.js', 'websock.js', 'des.js',
	//                    'keysymdef.js', 'keyboard.js', 'input.js', 'display.js',
	//                    'rfb.js', 'keysym.js']);

	Util.load_scripts(['webutil.js', 'base64.js', 'websock.js', 'des.js',
										'keysymdef.js', 'keyboard.js', 'input.js', 'display.js',
										'inflator.js', 'rfb.js', 'keysym.js']);
	// When finished will call onscriptsload
	setTimeout(() => {
		if (!window.AiClive.completed) {
			window.AiClive.completed = true;
			LiveActions.logMessage('noVNC utils load failed.');
			LiveActions.liveConnect.failure('Unable to connect session (timeout error).');
		}
	}, window.AiClive.timeout);
};

LiveActions.tryLoadNoVNC = function (cb) {
	LiveActions.logMessage('Loading noVNC core.');
	$.getScript('/noVNC/util.js')
	.done(() => {
		if (typeof Util === 'undefined') {
			LiveActions.logMessage('noVNC core load failed.');
			cb({success: false, errorMessage: 'Failed to set noVNC core.'});
		} else {
			LiveActions.logMessage('noVNC core loaded.');
			cb({success: true});
		}
	})
	.fail(() => {
		LiveActions.logMessage('noVNC core load failed.');
		cb({success: false, errorMessage: 'Failed to load noVNC core.'});
	});
};

LiveActions.tryAudioConnection = function (audiohost, audioport, cb) {
	const gobyVMAudio = document.getElementById('gobyVMAudio');
	gobyVMAudio.tries = 0;
	gobyVMAudio.maxTries = 4;
	gobyVMAudio.addEventListener('error', function (e) {
		debug('audio error:', arguments);
		// audio playback failed - show a message saying why
		// to get the source of the audio element use $(this).src
		switch (e.target.error.code) {
			case e.target.error.MEDIA_ERR_ABORTED:
				debug('You aborted the video playback.');
				break;
			case e.target.error.MEDIA_ERR_NETWORK:
				debug('A network error caused the audio download to fail.');
				break;
			case e.target.error.MEDIA_ERR_DECODE:
				debug('The audio playback was aborted due to a corruption problem or because the video used features your browser did not support.');
				break;
			case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
				debug('The video audio not be loaded, either because the server or network failed or because the format is not supported.');
				gobyVMAudio.tries += 1;
				if (gobyVMAudio.tries < gobyVMAudio.maxTries) {
					debug('audio trying again in', 2000 * gobyVMAudio.tries);
					setTimeout(() => {
						debug('audio setting src', gobyVMAudio.src + gobyVMAudio.tries);
						gobyVMAudio.src += gobyVMAudio.tries;
						gobyVMAudio.play();
					}, 2000 * gobyVMAudio.tries);
				} else {
					debug('audio max tries reached.');
				}
				break;
			default:
				debug('An unknown error occurred.');
				break;
		}
	}, false);
	// gobyVMAudio.addEventListener('canplay', function(ev) {
	//   debug('audio canplay:', arguments);
	//   if( gobyVMAudio.duration == 0 || gobyVMAudio.paused ){
	//     debug('audio canplay not pause');
	//     gobyVMAudio.play();
	//   }
	// }, false);
	// FIXME: put url parser
	const audioURL = `http://${audiohost}:${audioport}/test.webm?uid=${Date.now()}`;
	debug('setting audio url', audioURL);
	gobyVMAudio.src = audioURL;
	gobyVMAudio.play();
	cb({success: true, errorMessage: ''});
};

LiveActions.stopAudioConnection = function () {
	const gobyVMAudio = document.getElementById('gobyVMAudio');
	debug(gobyVMAudio);
	if (gobyVMAudio) {
		gobyVMAudio.pause();
		gobyVMAudio.src = '';
	}
};

LiveActions.listPackages.listen(function (avmId) {
	Gateway.live.listPackages({avmId})
	.then(res => {
		this.completed(res);
	}, err => {
		this.failure(err);
	});
});

LiveActions.monkeyRunner.listen(function (avmId, packages, eventCount, throttle) {
	Gateway.live.monkeyRunner({avmId, packages, eventCount, throttle})
	.then(res => {
		this.completed(res);
	}, err => {
		this.failure(err);
	});
});

LiveActions.properties.listen(function (avmId) {
	Gateway.live.properties({avmId}, {showError500Dialog: false})
	.then(res => {
		this.completed(res);
	}, err => {
		this.failure(err);
	});
});

module.exports = LiveActions;

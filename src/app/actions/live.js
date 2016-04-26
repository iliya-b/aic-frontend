/* global window, document */
'use strict';

// Vendor
import Reflux from 'reflux';
const debug = require('debug')('AiC:Live:Actions');

// APP
import Gateway from 'app/libs/gateway';
import NoVNCAdapter from 'app/libs/novnc-adapter';

// Actions
const LiveActions = Reflux.createActions({

	list: {asyncResult: true},
	stop: {asyncResult: true},
	start: {asyncResult: true},
	listPackages: {asyncResult: true},
	properties: {asyncResult: true},
	clearTimeouts: {},
	loadInfo: {asyncResult: true},
	monkeyRunner: {asyncResult: true},
	setSensor: {asyncResult: true},
	installAPK: {asyncResult: true},

	setProjectId: {asyncResult: true},
	loadState: {},
	setState: {},
	liveReset: {},
	// setDelayedRotation: {},
	// socketMessage: {},
	logMessage: {},
	liveConnect: {asyncResult: true}

	// audio related
});

// Listeners for asynchronous Backend API calls

// Backend related
LiveActions.list.listenAndPromise(Gateway.live.list);
LiveActions.stop.listenAndPromise(Gateway.live.delete);
LiveActions.start.listenAndPromise(Gateway.live.create);
LiveActions.listPackages.listenAndPromise(Gateway.live.listPackages);
LiveActions.properties.listenAndPromise(Gateway.live.properties);
LiveActions.loadInfo.listenAndPromise(Gateway.live.read);
LiveActions.monkeyRunner.listenAndPromise(Gateway.live.monkeyRunner);
LiveActions.setSensor.listenAndPromise(Gateway.live.sensor);
LiveActions.installAPK.listenAndPromise(Gateway.live.installAPK);

// noVNC & audio related
LiveActions.setProjectId.listenAndPromise(NoVNCAdapter.loadUtil);
LiveActions.liveConnect.listenAndPromise(avmId => {
	const AuthActions = require('app/actions/auth');
	const token = ` Bearer ${AuthActions.getToken()}`;
	const host = window.GobyAppGlobals.config.backend.host;
	const port = window.GobyAppGlobals.config.backend.port;
	const password = '';
	const path = `android/${avmId}/screen?token=${token}`;
	return new Promise((resolve, reject) => {
		const promises = [NoVNCAdapter.loadScripts, NoVNCAdapter.createRFB, NoVNCAdapter.connect.bind(NoVNCAdapter, host, port, password, path)];
		promises.reduce((pPrevious, pCurrent) => {
			return pPrevious.then(pCurrent);
		}, Promise.resolve()).then(resolve, reject);
	});
});

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
	gobyVMAudio.addEventListener('canplay', function () {
		debug('audio canplay:', arguments);
		if (gobyVMAudio.duration === 0 || gobyVMAudio.paused) {
			debug('audio canplay not pause');
			gobyVMAudio.play();
		}
	}, false);
	// FIXME: put url parser
	// const audioURL = `http://${audiohost}:${audioport}/test.webm?uid=${Date.now()}`;
	const audioURL = `https://${window.AiClive.host}:${window.AiClive.port}/${window.AiClive.audioPath}&uid=${Date.now()}`;
	debug('setting audio url', audioURL);
	gobyVMAudio.src = audioURL;
	gobyVMAudio.play();
	cb({success: true, errorMessage: ''});
};

LiveActions.disconnectScreen = function () {
	NoVNCAdapter.disconnect();
};

LiveActions.disconnectAudio = function () {
	debug('disconnectAudio');
	const gobyVMAudio = document.getElementById('gobyVMAudio');
	debug(gobyVMAudio);
	if (gobyVMAudio && !gobyVMAudio.paused) {
		gobyVMAudio.pause();
		// gobyVMAudio.src = '';
	}
	// live.js:240 Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
	// https://bugs.chromium.org/p/chromium/issues/detail?id=593273
};

module.exports = LiveActions;

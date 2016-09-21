/* global window, document */
'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';
import NoVNCAdapter from 'app/libs/novnc-adapter';
import AudioAdapter from 'app/libs/audio-adapter';

const LiveActions = Reflux.createActions({
	// list: {asyncResult: true},
	notifyList: {},
	stop: {asyncResult: true},
	start: {asyncResult: true},
	listPackages: {asyncResult: true},
	properties: {asyncResult: true},
	clearTimeouts: {},
	loadInfo: {asyncResult: true},
	monkeyRunner: {asyncResult: true},
	setSensor: {asyncResult: true},
	installAPK: {asyncResult: true},
	runTest: {asyncResult: true},

	setProjectId: {asyncResult: true},
	loadState: {},
	setState: {},
	liveReset: {},

	logMessage: {},
	liveConnect: {asyncResult: true},
	liveConnectAudio: {asyncResult: true},

	listImages: {asyncResult: true},

	enterFullscreen: {},
	exitFullscreen: {},
	enterScaledscreen: {},
	exitScaledscreen: {},
	recalculeScale: {},
	notifyLiveInstallAPK: {},
	notifyLiveMonkeyRunner: {},

	recalculeScaleIfConnected: {},
	notifyLiveProperties: {},
	notifyLiveRead: {}
});

// Backend related
// LiveActions.list.listenAndPromise(Gateway.live.list);
LiveActions.stop.listenAndPromise(Gateway.live.delete);
LiveActions.start.listenAndPromise(Gateway.live.create);
LiveActions.listPackages.listenAndPromise(Gateway.live.listPackages);
LiveActions.properties.listenAndPromise(Gateway.live.properties);
LiveActions.loadInfo.listenAndPromise(Gateway.live.read);
LiveActions.monkeyRunner.listenAndPromise(Gateway.live.monkeyRunner);
LiveActions.setSensor.listenAndPromise(Gateway.live.sensor);
LiveActions.installAPK.listenAndPromise(Gateway.live.installAPK);
LiveActions.listImages.listenAndPromise(Gateway.live.listImages);
LiveActions.runTest.listenAndPromise(Gateway.live.runTest);

// noVNC & audio related
LiveActions.setProjectId.listenAndPromise(NoVNCAdapter.loadUtil);
LiveActions.liveConnect.listenAndPromise(avmId => {
	const AuthActions = require('app/actions/auth');

	const token = ` Bearer ${AuthActions.getToken()}`;
	const host = window.GobyAppGlobals.config.backend.host;
	const port = window.GobyAppGlobals.config.backend.port;
	const path = `android/${avmId}/screen?token=${token}`;
	let password = '';

	return Gateway.live.totp({avmId}).then(totp => {
		if (totp.totp && totp.totp.length > 1) {
			password = totp.totp;
		} else {
			throw new Error('Could not get authentication for VNC.');
		}
		return new Promise((resolve, reject) => {
			const promises = [NoVNCAdapter.loadScripts, NoVNCAdapter.createRFB, NoVNCAdapter.connect.bind(NoVNCAdapter, host, port, password, path)];
			promises.reduce((pPrevious, pCurrent) => {
				return pPrevious.then(pCurrent);
			}, Promise.resolve()).then(resolve, reject);
		});
	});
});

LiveActions.liveConnectAudio.listenAndPromise(avmId => {
	const AuthActions = require('app/actions/auth');

	const token = ` Bearer ${AuthActions.getToken()}`;
	const host = window.GobyAppGlobals.config.backend.host;
	const port = window.GobyAppGlobals.config.backend.port;
	const path = `android/${avmId}/audio?token=${token}`;
	const audioElement = document.getElementById('gobyVMAudio');
	const audioURL = `https://${host}:${port}/${path}&uid=${Date.now()}`;
	return AudioAdapter.loadURL(audioElement, audioURL);
});

LiveActions.disconnectScreen = function () {
	NoVNCAdapter.disconnect();
};

LiveActions.disconnectAudio = function () {
	AudioAdapter.disconnect();
};

module.exports = LiveActions;

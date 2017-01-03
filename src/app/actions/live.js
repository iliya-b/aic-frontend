/* global window, document */
'use strict';

import Reflux from 'reflux';
import Gateway from 'app/libs/gateway';
import NoVNCAdapter from 'app/libs/novnc-adapter';
import AudioAdapter from 'app/libs/audio-adapter';

const LiveActions = Reflux.createActions({
	setProjectId: {asyncResult: true},
	notifyLiveRead: {},
	liveReset: {},
	start: {asyncResult: true},
	stop: {asyncResult: true},
	liveConnect: {asyncResult: true},
	liveConnectAudio: {asyncResult: true},
	setSensor: {asyncResult: true},
	listPackages: {asyncResult: true},
	installAPK: {asyncResult: true},
	notifyLiveInstallAPK: {},
	monkeyRunner: {asyncResult: true},
	notifyLiveMonkeyRunner: {},
	notifyLiveProperties: {},
	enterFullscreen: {},
	exitFullscreen: {},
	enterScaledscreen: {},
	exitScaledscreen: {},
	recalculeScale: {},
	recalculeScaleIfConnected: {},
	listTests: {asyncResult: true},
	runTest: {asyncResult: true},
	notifyLiveRunTest: {}
});

// Backend related
LiveActions.start.listenAndPromise(Gateway.live.create);
LiveActions.stop.listenAndPromise(Gateway.live.delete);
LiveActions.setSensor.listenAndPromise(Gateway.live.sensor);
LiveActions.listPackages.listenAndPromise(Gateway.live.listPackages);
LiveActions.installAPK.listenAndPromise(Gateway.live.installAPK);
LiveActions.monkeyRunner.listenAndPromise(Gateway.live.monkeyRunner);
LiveActions.listTests.listenAndPromise(Gateway.live.listTests);
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

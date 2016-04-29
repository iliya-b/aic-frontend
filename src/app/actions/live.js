/* global window, document */
'use strict';

// Vendor
import Reflux from 'reflux';
// const debug = require('debug')('AiC:Live:Actions');

// APP
import Gateway from 'app/libs/gateway';
import NoVNCAdapter from 'app/libs/novnc-adapter';
import AudioAdapter from 'app/libs/audio-adapter';

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

	logMessage: {},
	liveConnect: {asyncResult: true},
	liveConnectAudio: {asyncResult: true}
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

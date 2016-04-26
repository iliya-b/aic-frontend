/* global Util, window, RFB, $D */
'use strict';

const debug = require('debug')('AiC:Libs:NoVNCAdapter');

// APP
const noVNCState = {};

const NoVNCAdapter = {
	loadUtil: () => {
		return new Promise((resolve, reject) => {
			if (typeof Util === 'undefined') {
				reject('noVNC Util load failed.');
			} else {
				resolve();
			}
		});
	},

	loadScripts: () => {
		return new Promise((resolve, reject) => {
			if (noVNCState.loadScripts) {
				resolve();
			} else {
				debug('loadScripts Promise', this);

				noVNCState.loadScripts = true;

				const timeoutIfNotLoad = setTimeout(() => {
					debug('loadScripts timeout', this);
					debug('noVNC scripts not loaded');
					reject('noVNC scripts not loaded');
					noVNCState.loadScripts = false;
				}, 15000);

				// Need to set onscriptsload for noVNC
				window.onscriptsload = () => {
					debug('loadScripts onscriptsload', this);
					debug('noVNC scripts loaded');
					clearTimeout(timeoutIfNotLoad);
					resolve();
				};

				window.INCLUDE_URI = '/noVNC/';

				// Load noVNC supporting scripts
				// noVNC@v5.0.1
				Util.load_scripts(['webutil.js', 'base64.js', 'websock.js', 'des.js',
													'keysymdef.js', 'keyboard.js', 'input.js', 'display.js',
													'jsunzip.js', 'rfb.js', 'keysym.js']);
			}
		});
	},

	createRFB: () => {
		return new Promise((resolve, reject) => {
			debug('createRFB Promise');
			let isResolved = false;
			// Called when RFB changes state
			const rfbUpdateState = (rfb, state, oldstate) => {
				debug('rfb updateState', rfb, state, oldstate, arguments);
				if (state === 'loaded' && !isResolved) {
					isResolved = true;
					resolve();
				}
				if (state === 'normal') {
					clearTimeout(noVNCState.connect.timeoutIfNotLoad);
					noVNCState.connect.resolve();
				}
			};
			try {
				noVNCState.rfb = new RFB({target: $D('noVNC_canvas'), encrypt: true, onUpdateState: rfbUpdateState});
			} catch (exc) {
				reject(`Unable to create noVNC client (${exc}).`);
			}
		});
	},

	connect: (host, port, password, path) => {
		return new Promise((resolve, reject) => {
			noVNCState.connect = noVNCState.connect || {};
			noVNCState.connect.resolve = resolve;
			noVNCState.connect.timeoutIfNotLoad = setTimeout(() => {
				reject('noVNC connect timeout');
			}, 15000);
			noVNCState.rfb.connect(host, port, password, path);
		});
	},

	disconnect: () => {
		debug('disconnect');
		if (!noVNCState.rfb) {
			return;
		}
		noVNCState.rfb.disconnect();
	}

};

module.exports = NoVNCAdapter;

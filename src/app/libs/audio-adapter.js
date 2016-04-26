'use strict';

const debug = require('debug')('AiC:Libs:AudioAdapter');

// APP
const AudioState = {};

const AudioAdapter = {
	loadURL: (audioElement, audioURL) => {
		AudioState.element = audioElement;
		return new Promise((resolve, reject) => {
			audioElement.addEventListener('canplay', function () {
				debug('audio canplay:', arguments);
				if (audioElement.duration === 0 || audioElement.paused) {
					debug('audio canplay not pause');
					audioElement.play();
				}
			}, false);
			// FIXME: put url parser
			// const audioURL = `http://${audiohost}:${audioport}/test.webm?uid=${Date.now()}`;
			debug('setting audio url', audioURL);
			audioElement.src = audioURL;
			audioElement.play();
		});
	},

	disconnect: () => {
		debug('disconnectAudio');
		if (AudioState.element && !AudioState.element.paused) {
			AudioState.element.pause();
			// AudioState.element.src = '';
		}
		// live.js:240 Uncaught (in promise) DOMException: The play() request was interrupted by a new load request.
		// https://bugs.chromium.org/p/chromium/issues/detail?id=593273
	}

};

module.exports = AudioAdapter;

/* global Util */
'use strict';

// const debug = require('debug')('AiC:Libs:NoVNCUtils');

// APP
// import LiveActions from 'app/actions/live';

const NoVNCUtils = {
	tryLoadNoVNC: () => {
		return new Promise((resolve, reject) => {
			if (typeof Util === 'undefined') {
				reject('noVNC core load failed.');
			} else {
				resolve();
			}
		});
	}
};

module.exports = NoVNCUtils;

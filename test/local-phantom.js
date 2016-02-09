'use strict';

const Mink = require('cucumber-mink');

// Local PhantomJS
const parameters = {
	driver: {
		logLevel: 'silent',
		desiredCapabilities: {
			browserName: 'phantom'
		},
		port: 8910
	}
};

module.exports = function () {
	Mink.init(this, parameters);
};

'use strict';

const Mink = require('cucumber-mink');

// Local PhantomJS
const parameters = {
	driver: {
		logLevel: 'silent',
		desiredCapabilities: {
			browserName: 'phantom'
		},
		port: 8910,
		screenshotPath: './screenshots/'
	}
};

module.exports = function () {
	console.log('here');
	console.log(process ? process.env : 'no process');
	Mink.init(this, parameters);
};

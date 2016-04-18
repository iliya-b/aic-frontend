'use strict';

const fs = require('fs');
const gulp = require('gulp');

const configSampleFile = 'config-sample.json';
const configFile = 'config.json';

const environmentPrefixRegex = /^AIC_FRONTEND_(.+)/;

const haveSub = /([^_.]+)_(.+)/;

function recChange(obj, key, value) {
	const keyHasSub = key.match(haveSub);
	if (keyHasSub) {
		obj[keyHasSub[1]] = recChange(obj[keyHasSub[1]], keyHasSub[2], value);
		return obj;
	}
	if (value === 'true') {
		obj[key] = true;
	} else if (value === 'false') {
		obj[key] = false;
	} else {
		obj[key] = value;
	}
	return obj;
}

gulp.task('create-conf-from-env', () => {
	let config = JSON.parse(fs.readFileSync(configSampleFile, 'utf-8'));
	// var envKeys = Object.keys(process.env);
	// TODO: revise this for in
	for (const key in process.env) { // eslint-disable-line guard-for-in
		const matched = key.match(environmentPrefixRegex);
		if (matched) {
			console.log('changing ', key);
			config = recChange(config, matched[1].toLowerCase(), process.env[key]);
		}
	}
	// TODO: not override existing files
	return fs.writeFileSync(configFile, JSON.stringify(config), 'utf-8');
});

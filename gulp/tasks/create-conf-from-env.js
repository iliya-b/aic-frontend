var gulp = require('gulp');
var fs = require('fs');

const configSampleFile = 'config-sample.json';
const configFile = 'config.json';

const environmentPrefixRegex = /^AIC_FRONTEND_(.+)/;

const haveSub = /([^_.]+)_(.+)/;

function recChange(obj, key, value) {
	var keyHasSub = key.match(haveSub);
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

gulp.task('create-conf-from-env', function () {
	var config = JSON.parse(fs.readFileSync(configSampleFile, 'utf-8'));
	// var envKeys = Object.keys(process.env);
	for (var key in process.env) {
		var matched = key.match(environmentPrefixRegex);
		if (matched) {
			console.log('changing ', key);
			config = recChange(config, matched[1].toLowerCase(), process.env[key]);
		}
	}
	// TODO: not override existing files
	return fs.writeFileSync(configFile, JSON.stringify(config), 'utf-8');
});

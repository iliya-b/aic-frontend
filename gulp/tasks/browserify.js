'use strict';
/* browserify task
	 ---------------
	 Bundle javascripty things with browserify!
	 This task is set up to generate multiple separate bundles, from
	 different sources, and to use Watchify when run from the default task.
	 See browserify.bundleConfigs in gulp/config.js
*/

const browserify = require('browserify');
const watchify = require('watchify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const bundleLogger = require('../util/bundleLogger');
const handleErrors = require('../util/handleErrors');
const config = require('../config').browserify;

gulp.task('browserify', callback => {
	let bundleQueue = config.bundleConfigs.length;

	const browserifyThis = function (bundleConfig) {
		let bundler = browserify({
			// Required watchify args
			cache: {}, packageCache: {}, fullPaths: false, paths: ['./src'],
			// Specify the entry point of your app
			entries: bundleConfig.entries,
			// Add file extentions to make optional in your requires
			extensions: config.extensions,
			// Enable source maps!
			debug: config.debug
		});

		const reportFinished = function () {
			// Log when bundling completes
			bundleLogger.end(bundleConfig.outputName);

			if (bundleQueue) {
				bundleQueue--;
				if (bundleQueue === 0) {
					// If queue is empty, tell gulp the task is complete.
					// https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
					callback();
				}
			}
		};

		const bundle = function () {
			// Log when bundling starts
			bundleLogger.start(bundleConfig.outputName);

			return bundler
				// .transform(babelify.configure({
				//   // optional: ["es7.objectRestSpread"]
				//   stage: 0
				// }))
				// replaces process.env.* for strings defined on
				// environment variables
				.transform('envify')
				.bundle()
				// Report compile errors
				.on('error', handleErrors)
				// Use vinyl-source-stream to make the
				// stream gulp compatible. Specifiy the
				// desired output filename here.
				.pipe(source(bundleConfig.outputName))
				// Specify the output destination
				.pipe(gulp.dest(bundleConfig.dest))
				.on('end', reportFinished);
		};

		if (global.isWatching) {
			// Wrap with watchify and rebundle on changes
			bundler = watchify(bundler);
			// Rebundle on update
			bundler.on('update', bundle);
		}

		return bundle();
	};

	// Start bundling with Browserify for each bundleConfig specified
	config.bundleConfigs.forEach(browserifyThis);
});

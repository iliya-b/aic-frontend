'use strict';

const gulp = require('gulp');
const config = require('../config').copy;

function gulpCopy(info) {
	return gulp.src(info.src)
		.pipe(gulp.dest(info.dest));
}

gulp.task('copy', () => {
	if (Array.isArray(config)) {
		return config.map(info => {
			return gulpCopy(info);
		});
	}
	return gulpCopy(config);
});

gulp.task('copy:watch', () => {
	let srcs;
	if (Array.isArray(config)) {
		srcs = config.map(info => {
			return info.src;
		});
	} else {
		srcs = config.src;
	}
	gulp.watch(srcs, ['copy']);
});

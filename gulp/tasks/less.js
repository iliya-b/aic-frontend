const gulp = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const handleErrors = require('../util/handleErrors');
const config = require('../config').less;

gulp.task('less', () => {
	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(less())
		.on('error', handleErrors)
		.pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dest));
});

gulp.task('less:watch', () => {
	return gulp.watch(config.src, ['less']);
});

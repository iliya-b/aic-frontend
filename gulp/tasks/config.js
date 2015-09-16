var gulp = require('gulp');
var config = require('../config').config;

gulp.task('config', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

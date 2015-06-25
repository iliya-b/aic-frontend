var gulp = require('gulp');
var config = require('../config').novnc;

gulp.task('novnc', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

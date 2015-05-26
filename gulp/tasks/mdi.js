var gulp = require('gulp');
var config = require('../config').mdi;

gulp.task('mdi', function() {
  var fonts = gulp.src(config.fonts.files)
    .pipe(gulp.dest(config.fonts.dest));
  return gulp.src(config.css.src)
    .pipe(gulp.dest(config.css.dest));
});

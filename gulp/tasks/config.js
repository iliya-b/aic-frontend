var gulp = require('gulp');
var config = require('../config').config;
var fs = require('fs');

gulp.task('config', function() {
  config.src.map(function(item){fs.access(item, fs.R_OK, function(err) {
    if(err) {
      console.log('Could not find ', item, 'file. Did you forget to include your configuration file?');
      throw err;
    }
  })});
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

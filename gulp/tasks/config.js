var gulp = require('gulp');
var config = require('../config').config;
var fs = require('fs');

gulp.task('config', function() {
  config.src.map(function(item){fs.stat(item, function(err) {
    if(err) {
      console.log('***********************************************');
      console.log('Could not find ', item, 'file. \nDid you forget to include your configuration file?', item);
      console.log('***********************************************');
      throw err;
    }
  })});
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});

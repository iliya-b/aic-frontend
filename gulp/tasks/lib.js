var gulp   = require('gulp');
var fs     = require('fs');
var config = require('../config').lib;

gulp.task('lib', function() {
  var libDir = config.dest + '/' + config.name;

  fs.exists(config.dest,function(dirExists){
    if (!dirExists) {
      console.log('[lib] Creating ' + config.dest);
      fs.mkdirSync(config.dest);
    }
  });
  fs.exists(libDir,function(dirExists){
    if (!dirExists) {
      console.log('[lib] Creating ' + libDir);
      fs.symlinkSync(config.src,libDir,'dir');
    }
  });
});
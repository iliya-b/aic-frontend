var gulp = require('gulp');
var config = require('../config').jshint;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var react = require('gulp-react');
var reactify = require('gulp-reactify');
var jsvalidate = require('gulp-jsvalidate');
var babel = require("gulp-babel");
var notify = require("gulp-notify");

gulp.task('lint', function() {
  return gulp.src(config.src)
    .pipe(react())
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(jshint({
      "asi": true,
      "browser": true,
      "eqnull": true,
      "esnext": true,
      "expr": true,
      "loopfunc": true,
      "node": true,
      "sub": true,
      "undef": true,
      'curly': true,
      'jquery': true,
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(jshint.reporter(stylish));
});

// gulp.task('lint', function() {
//   return gulp.src(config.src)
//   .pipe(react())
//   // .pipe(reactify({'es6': true}))
//   // .pipe(babel())
//   // .on('error', console.error.bind(console))
//   .on('error', notify.onError('<%= error.message %>'))
//   .pipe(jshint())
//   .pipe(jshint.reporter('jshint-stylish'))
//   // .pipe(jshint.reporter('fail'))
//   .pipe(jsvalidate());
// });

gulp.task('watch-lint', [], function() {
  gulp.watch(config.src, ['lint']);
});

// var shell = require('gulp-shell');

// gulp.task('jshint', shell.task([
//   '../node_modules/.bin/jsxhint --harmony "../src/**" "./src/app/**" --exclude ../src/utils/modernizr.custom.js'
// ])).on('error', notify.onError('<%= error.message %>'));

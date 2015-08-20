var gulp = require('gulp');
var config = require('../config').jshint;
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
// var react = require('gulp-react');
// var reactify = require('gulp-reactify');
var jsvalidate = require('gulp-jsvalidate');
var babel = require("gulp-babel");
var notify = require("gulp-notify");
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');

gulp.task('lint', function() {
  return gulp.src(config.src)
    // .pipe(babel( {stage:0, compact:false, retainLines: true } ))
    // .pipe(react())
    // .pipe(gulp.dest("disttest"));
    // .on('error', notify.onError('<%= error.message %>'))
    // .pipe(jshint({
    //   "asi": true,
    //   "browser": true,
    //   "eqnull": true,
    //   "esnext": true,
    //   "expr": true,
    //   "loopfunc": true,
    //   "node": true,
    //   "sub": true,
    //   "undef": true,
    //   "unused": true,
    //   'curly': true,
    //   'jquery': true,

    // // // jquery
    // // "boss": true,
    // // "curly": true,
    // // "eqeqeq": true,
    // // "eqnull": true,
    // // "expr": true,
    // // "immed": true,
    // // "noarg": true,
    // // "quotmark": "double",
    // // "smarttabs": true,
    // // "trailing": true,
    // // "undef": true,
    // // "unused": true
    // }))
    // .on('error', notify.onError('<%= error.message %>'))
    // .pipe(jshint.reporter(stylish));
    // .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        // .pipe(eslint.format())
        .pipe(eslint())
        .pipe(eslint.formatEach('stylish', process.stdout))
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failOnError last.
        // .pipe(eslint.failOnError());
        // .pipe(gulp.dest('disttest/lintoutput'));
});


gulp.task('jscs', function () {
  return gulp.src(config.src)
    .pipe(babel())
    .pipe(jscs({"preset": "google"}));
});


gulp.task('watch-jscs', [], function() {
  gulp.watch(config.src, ['jscs']);
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


/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

const gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync', 'copy:watch', 'less:watch'], () => {
});

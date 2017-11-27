import gulp from 'gulp';
import browserify from "browserify";
import source from "vinyl-source-stream";
import fs from 'fs';

const destPaths = {
  js: './dist/scripts'
}

const sourcePaths = {
  js:  [ './assets/scripts/*.js' ]
}

/**
 * Browserify stuff
 */
gulp.task('browserify', () => {
  browserify({
    entries: './assets/scripts/app.js',
    debug: true
  })
  .bundle()
  .pipe(source('script.js'))
  .pipe(gulp.dest( destPaths.js ));
});


gulp.task('serve', () => {
  gulp.watch( sourcePaths.js,  [ 'browserify' ] );
})

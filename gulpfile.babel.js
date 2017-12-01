import gulp from 'gulp';
import browserify from "browserify";
import source from "vinyl-source-stream";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import strip from "gulp-strip-comments";
import rename from "gulp-rename";
import fs from 'fs';

const destPaths = {
  root: './dist',
  js: './dist/assets/scripts',
  img: './dist/assets/img'
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
  gulp.watch( 'index.html',  [ 'build' ] );
})

gulp.task('build', ['scripts', 'vendorjs', 'images', 'files', 'arjs']);

gulp.task('scripts', () => {
  return gulp.src( ['./assets/scripts/*.js'])
    .pipe( concat( 'scripts.js' ) )
    .pipe( gulp.dest( destPaths.js ) )
});

gulp.task('vendorjs', () => {
  return gulp.src( ['node_modules/aframe/dist/aframe.js'])
    .pipe( concat( 'vendor.js' ) )
    .pipe( gulp.dest( destPaths.js ) )
})

gulp.task('arjs', () => {
  return gulp.src( ['./assets/scripts/ar/*.js'])
    .pipe( concat( 'ar.js' ) )
    .pipe( gulp.dest( destPaths.js ) )
})

gulp.task('images', () => {
  return gulp.src( './assets/img/*' )
    .pipe( gulp.dest( destPaths.img ) )
})

gulp.task('files', () => {
  return gulp.src( 'index.html' )
    .pipe( gulp.dest( destPaths.root ) )
})

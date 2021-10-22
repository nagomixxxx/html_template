const gulp = require( 'gulp' );

//sass
gulp.task( 'sass', () => {
  const sass = require( 'gulp-sass' );
  const sassGlob = require( 'gulp-sass-glob' );
  const cssnext = require( 'postcss-cssnext' );
  const postcss = require( 'gulp-postcss' );
  const autoprefixer = require( 'autoprefixer' );
  const cssdeclsort = require( 'css-declaration-sorter' );
  const mmq = require( 'gulp-merge-media-queries' );
  const merge = require( 'merge-stream' );

  var common = gulp.src( './app/src/scss/**/*.scss' )
    .pipe( sassGlob() )
    .pipe( sass({ outputStyle: 'expanded' }) )
    .pipe( postcss([
      autoprefixer({

      //IE:11~, Android:4.4~ other:latest 2 version
      browsers: [ 'last 2 versions', 'ie >= 11', 'Android >= 4' ],
      cascade: false
      })
     ]) )
    .pipe( postcss([ cssdeclsort({ order: 'alphabetically' }) ]) )
    // .pipe( mmq() )
    .pipe( gulp.dest( './app/assets/css' ) );

    return merge( common );

});

//js transepile
gulp.task( 'babel', () => {
  const babel = require( 'gulp-babel' );
  return gulp
    .src( './app/src/js/*.js' )
    .pipe( babel() )
    .pipe( gulp.dest( './app/assets/js' ) );
});


//browser sync
const browserSync = require( 'browser-sync' ).create();
gulp.task( 'serve', done => {
  browserSync.init({
    server: {
      baseDir: './app',
      index: 'index.html'
    }
  });
  done();
});

gulp.task( 'watch', () => {
  const browserReload = done => {
    browserSync.reload();
    done();
  };

  gulp.watch( './app/**/*', browserReload );
  gulp.watch( './app/src/scss/**/*.scss', gulp.series( 'sass' ) );
  gulp.watch( './app/src/js/*.js', gulp.series( 'babel' ) );
});

gulp.task( 'default', gulp.series( 'serve', 'watch' ) );

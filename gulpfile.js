
const gulp = require( 'gulp' );
browserSync  = require( 'browser-sync' ).create();
const sass  = require( 'gulp-sass' );
var useref = require('gulp-useref');
const cleanCSS  = require( 'gulp-clean-css' );
const babel = require('gulp-babel');
const uglify  = require( 'gulp-uglify' );
const imagemin  = require( 'gulp-imagemin' );
const cache = require ( 'gulp-cache' );
 
function style() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('app/css'))
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
  gulp.watch('app/scss/**/*.scss', style);
  gulp.watch('app/*.html').on('change', browserSync.reload);
  gulp.watch('app/js/*.js').on('change', browserSync.reload);
}

gulp.task('html', function() { //copy html in dist
  return gulp.src('app/*.html')
  .pipe(useref())
  .pipe(gulp.dest('dist'))
});

gulp.task('minify-css', () => {//minify css files and place them in  dist folder
  return gulp.src('app/css/**/*.css')
 .pipe(cleanCSS())
 .pipe(gulp.dest('dist/css'));
});

gulp.task('script', () => { //uglify js file and place them in  dist folder
  return gulp.src('app/js/*.js')
  .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
});

gulp.task('images', function(){  //optimizing images and place them in  dist folder
   return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg)')
   .pipe(cache(imagemin({
       interlaced: true
     })))
   .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('fonts', function() {  //copy fonts in dist
   return gulp.src('app/fonts/**/*')
   .pipe(gulp.dest('dist/fonts'))
})

gulp.task('json', done =>  { //copy fonts in dist
  gulp.src('app/assets/*.json')
  .pipe(gulp.dest('dist/assets'));
  done();
});

 exports.style = style;
 exports.watch = watch;

gulp.task('build', gulp.series(
   'json', 
   'minify-css', 
   'images', 
   'fonts', 
   'script',
   'html'
));





var gulp = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var useref = require('useref');
	
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass())
    .pipe(gulp.dest('app/css'))   
})

gulp.task('css', function(){   //minify css
  return gulp.src('app/css/**/*.css')
     .pipe(sass())
     .pipe(cssnano())
     .pipe(gulp.dest('dist/css'));
});

gulp.task('useref', function(){ //uglify js
  return gulp.src('./app/*.html')
    .pipe(useref())
    .pipe(gulpIf('./app/js/*.js', uglify()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){  //optimizing images
  return gulp.src('app/assets/images/**/*.+(png|jpg|jpeg)')
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/assets/images'))
});

gulp.task('fonts', function() {  //copy fonts in dist, they are alredy optimized
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('clean:dist', function() {  //cleaning up generated files
  return del.sync('dist');
})

gulp.task('watch', function(){
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
});






"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task('concatScripts', function() {
    return gulp.src([
        'src/js/allocate.js',
        'src/js/getters.js',
        'src/js/breeding.js',
        'src/js/global-variables.js',
        'src/js/helpers.js',
        'src/js/map.js',
        'src/js/messages.js',
        'src/js/progress-bar.js',
        'src/js/raccoon-names.js',
        'src/js/raccoons.js',
        'src/js/game.js'
        ])
   	.pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('minifyScripts', ['concatScripts'], function() {
    return gulp.src('src/js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('src/js'));
});

gulp.task('sass', function () {
  return gulp.src('src/styles/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write())
    .pipe(gulp.dest('src/styles'));
});

gulp.task('clean', function() {
  	del(['dist', 'src/js/app*.js*']);
});

gulp.task('watchFiles', function() {
  gulp.watch('src/js/*.js', ['minifyScripts', 'build']);
  gulp.watch('src/css/*.scss', ['sass', 'build']);
  gulp.watch('src/index.html', ['build']);
})

gulp.task("build", ['minifyScripts', 'sass'], function() {
  	return gulp.src(["src/styles/style.css", "src/js/app.js", "src/js/app.min.js", 'src/index.html'], { base: './src/'})
               .pipe(gulp.dest('dist'));
});

gulp.task('server', ['watchFiles']);

gulp.task('default', ['clean'], function() {
	gulp.start('build');
})

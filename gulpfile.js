"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
     del = require('del');

gulp.task('concatScripts', () => {
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
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('sass', () => {
  return gulp.src('./src/styles/*.scss')
    .pipe(maps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(maps.write())
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('clean', () => {
  	del(['dist', 'src/js/app*.js*']);
});

gulp.task('watchFiles', () => {
  gulp.watch('src/js/*.js', ['concatScripts', 'build']);
  gulp.watch('src/styles/*.scss', ['sass', 'build']);
  gulp.watch('src/index.html', ['build']);
})

gulp.task("build", ['concatScripts', 'sass'], () => {
  	return gulp.src([ 'src/index.html',
                      'src/img/*.png' ],
                      { base: './src/'} )
               .pipe(gulp.dest('dist'));
});

gulp.task('server', ['watchFiles']);

gulp.task('default', ['clean'], () => gulp.start('build'));

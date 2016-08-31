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
        'src/js/breeding.js',
        'src/js/getters.js',
        'src/js/global-variables.js',
        'src/js/helpers.js',
        'src/js/messages.js',
        'src/js/progress-bar.js',
        'src/js/raccoons.js',
        'src/js/game.js'
        ])
   	.pipe(maps.init())
    .pipe(concat('app.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('src/js'));
});

gulp.task('clean', function() {
  	del(['dist', 'src/js/app*.js']);
});

gulp.task("build", ['concatScripts'], function() {
  	return gulp.src(["src/styles/style.css", "src/js/app.js", 'src/index.html'], { base: './src/'})
               .pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'], function() {
	gulp.start('build');
})
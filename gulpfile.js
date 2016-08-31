var gulp = require('gulp'),
  concat = require('gulp-concat');

gulp.task('concatScripts', function() {
    return gulp.src([
        'js/*.js',
        ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('default', function() {
	console.log("Default task - does nothing at the moment");
})
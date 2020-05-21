'use strict';

var gulp = require('gulp'),
	wiredep = require('wiredep').stream;

// inject bower components
gulp.task('wiredep', function () {
  return gulp.src('app/*.html')
    .pipe(wiredep({
    	directory: 'app/bower_components',
		exclude: ['bootstrap-sass-official']
    }))
    .pipe(gulp.dest('app'));
});
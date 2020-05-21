'use strict';

var gulp = require('gulp');

require('require-dir')('./gulp');

gulp.task('default', ['clean', 'clear'], function () {
	gulp.start('build');
});
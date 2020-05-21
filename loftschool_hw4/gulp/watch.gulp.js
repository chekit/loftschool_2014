'use strict';

var gulp = require('gulp');

var paths = {
	sass: 'app/sass/**/*',
	jade: 'app/jade/**/*',
	html: 'app/*/html',
	img: 'app/images/**/*'
};

gulp.task('watch', function () {
	gulp.watch(paths.jade, ['jade']);
	gulp.watch(paths.sass, ['sass']);
	gulp.watch(paths.img, ['images']);
});
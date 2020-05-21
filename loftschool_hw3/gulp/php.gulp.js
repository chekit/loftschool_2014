'use strict';

var gulp = require('gulp'),
	del = require('del');

//Tasks to create PHP dirrectory and copy to WAMP dev folder
var paths = {
	css: 'css',
	js: 'js',
	images: 'images',
	dev: 'C:\\wamp\\www\\wmapp\\',
	app: 'serv/',
	link: ''
};

//Copy CSS
gulp.task('csscopy', function () {
	return gulp.src('dist/css/**/*')
		.pipe(gulp.dest(paths.link + paths.css));
});

//Copy JS
// gulp.task('jscopy', function () {
// 	return gulp.src('dist/js/**/*')
// 		.pipe(gulp.dest(paths.js));
// });

//Copy Images
gulp.task('imgcopy', function () {
	return gulp.src('dist/images/**/*')
		.pipe(gulp.dest(paths.link + paths.images));
});

gulp.task('php', function () {
	paths.link = paths.app;
	gulp.start('csscopy', 'imgcopy');
});

gulp.task('dev', function () {
	paths.link = paths.dev;
	gulp.start('csscopy', 'imgcopy');
});
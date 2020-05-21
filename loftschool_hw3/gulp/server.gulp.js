'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');

var files = [
	'./app/sass/**/*',
	'./app/sass/base/fonts/**/*',
	'./app/*.html',
	'./bower.json',
	'./app/jade/**/*.jade',
	'./app/js/*.js',
	'app/images/**/*.{png,jpg,gif,svg}'
];

gulp.task('browser-sync', function () {
	browserSync({
		startPath: 'index.html',
        server: {
            baseDir: ['app']
        },
        files: files
    });
});

gulp.task('server', ['build', 'watch'], function () {
	gulp.start('browser-sync');
});
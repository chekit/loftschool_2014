'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync');

var files = [
	'./app/sass/**/*.sass',
	'./app/images/**/*.{png.gif,jpg}',
	'./app/*.html',
	'./bower.json',
	'./app/jade/**/*.jade',
	'./app/js/*.js'
];

var config = {
	startPath: 'index.html',
    server: {
        baseDir: "app"
    },
    files: files
};

gulp.task('browser-sync', function () {
	browserSync(config);
});
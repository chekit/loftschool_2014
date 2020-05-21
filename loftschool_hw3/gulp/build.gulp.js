'use strict';

var gulp = require('gulp'),
	prefix = require('gulp-autoprefixer'),
	gulpif = require('gulp-if'),
	cache = require('gulp-cache'),
	del = require('del'),
	// imagemin = require('gulp-imagemin'),
	pls = require('gulp-load-plugins')();

//Error Handler
var errorLog = function (error) {
	console.error(error.toString());
	this.emit('end');
};

//Paths
var paths = {
	jade: 'app/jade/index.jade',
	sass: 'app/sass/styles.scss',
	html: 'app/*.html',
	images: 'app/images/**/*.{png,jpg,gif,svg}',
	fonts: 'app/sass/base/fonts/**/*',
	js: 'app/js/*.js'
};

//HTML
gulp.task('html', ['wiredep'], function () {
	var assets = pls.useref.assets();

	return gulp.src(paths.html)
		.pipe(assets)
			// Uglify, Concat Libs 
			.pipe( gulpif('*.js', pls.uglify()) )
			//Minify, Optimize CSS
			.pipe( gulpif('*.css', pls.csso()) )
		.pipe(assets.restore())
		.pipe(pls.useref())
		.pipe(gulp.dest('dist'));
});

//Images
gulp.task('images', function () {
	return gulp.src(paths.images)
		.pipe(pls.size())
		/*
		.pipe(cache(imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true
		})))
		*/
		.pipe(gulp.dest('dist/images'))
		.pipe(pls.size());
});

//Fonts
gulp.task('fonts', function () {
	return gulp.src(paths.fonts)
		.pipe(gulp.dest('app/css/fonts'))
		.pipe(gulp.dest('dist/css/fonts'));
});

//Jade to HTML
gulp.task('jade', function () {
	return gulp.src(paths.jade)
		.pipe(pls.jade({
			pretty: true
		}))
		.on('error', errorLog)
		.pipe(gulp.dest('./app/'))
		.pipe(pls.notify('HTML compile complete!'));
});

//Sass to CSS
gulp.task('sass', ['fonts'], function () {
	return gulp.src(paths.sass)
		.pipe(pls.rubySass())
		.on('error', errorLog)
		.pipe(pls.csscomb())
		.pipe(prefix('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', { map: true }))
		.pipe(gulp.dest('app/css'))
		.pipe(pls.notify('Sass compile complete'));
});

//JS
gulp.task('js', function() {
	return gulp.src(paths.js)
		.pipe(pls.jshint())
		.on('error', errorLog)
		.pipe(pls.jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest('app/js'))
		.pipe(pls.uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(pls.notify('JS compile complete!'));
});

//Clean Dirs
gulp.task('clean', function (done) {
	del(['app/css', 'dist'], done);
});

//Clear Cache
gulp.task('clear', function (done) {
	return cache.clearAll(done);
});

//Build
gulp.task('build', ['sass', 'jade'], function () {
	gulp.start('html', 'images', 'js');
});


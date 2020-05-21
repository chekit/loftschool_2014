'use strict';

var gulp = require('gulp'),
	pls = require('gulp-load-plugins')(),
	gulpif = require('gulp-if'),
	del = require('del'),

	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

var paths = {
	app  	: './app',
	jade 	: ['./app/jade/*.jade', '!./app/jade/config.jade', '!./app/jade/add-page.jade'],
	sass 	: './app/sass/*.scss',
	css 	: './app/css',
	js 		: './app/js/*.js',
	html 	: './app/*.html'
};

var errorHandler = function (error) {
	console.error(error);
	this.emit('end');
}

//==== COMPILE JADE (START)
gulp.task('jade', ['includes'], function () {
	return gulp.src(paths.jade)
		.pipe(pls.jade({
			pretty: true
		}))
		.on('error', errorHandler)
		.pipe(gulp.dest(paths.app))
		.pipe(pls.notify('Jade complete!'));
});

//Compile HTML Includes (Parts)
gulp.task('includes', function () {
	return gulp.src('./app/jade/includes/*.jade')
		.pipe(pls.jade({
			pretty: true
		}))
		.on('error', errorHandler)
		.pipe(gulp.dest(paths.app + '/includes'))
		.pipe(pls.notify('Jade Includes complete!'));
});
//==== COMPILE JADE (END)

//==== COMPILE SASS (START)
gulp.task('sass', ['fonts'], function () {
	return gulp.src(paths.sass)
		.pipe(pls.rubySass())
		.on('error', errorHandler)
		.pipe(pls.autoprefixer())
		.pipe(pls.csscomb())
		.pipe(gulp.dest(paths.css))
		.pipe( reload({stream:true}) )
		.pipe(pls.notify('Sass complete!'));
});

//Copy Fonts
gulp.task('fonts', function () {
	return gulp.src('./app/sass/base/fonts/**/*')
		.pipe(gulp.dest(paths.css + '/fonts/'));
});
//==== COMPILE SASS (END)

//==== JSHint (START)
gulp.task('js', function () {
	return gulp.src(paths.js)
		.pipe(pls.jshint())
		.on('error', errorHandler)
		.pipe(pls.jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(paths.js));
});
//==== JSHint (END)

//Clear Directories
gulp.task('clear_app', function (done) {
	del(['app/css'], done);
	console.info('=== Clear ./app/css/ ===');
});

//Start Dev Server
gulp.task('server', ['clear_app'], function () {
	gulp.start('jade', 'wiredep', 'sass', 'js', 'watch', 'browser-sync');
})
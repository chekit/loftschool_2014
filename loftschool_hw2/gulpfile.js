'use strict';

var gulp = require('gulp'),
	//load plugins
	pls = require('gulp-load-plugins')(),
	autoprefixer = require('gulp-autoprefixer'),
	// watch = require('gulp-watch'),
	//Filter
	filter = pls.filter('**/*.js', '!**/*.min.js');

//Errors Handler
var errorLog = function (error) {
	console.error.bind(error);
	console.log(error);
	this.emit('end');
};

//HTML
gulp.task('html', function () {
	return gulp.src('app/*.html')
		.pipe( pls.usemin({
			css: [pls.replace('../../app/images/', '../images/'), pls.csso(), pls.rename({ suffix: '.min' })]
		}) )
		.pipe( gulp.dest('dist/') )
		.pipe( pls.connect.reload() )
		.pipe( pls.notify('HTML') );
});

//Images
gulp.task('images', function () {
	return gulp.src('app/images/**/*')
		.pipe( pls.cache( pls.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }) ) )
		.pipe( gulp.dest('dist/images') )
		.pipe( pls.connect.reload() );
});

//Sass
gulp.task('sass', function () {
	return gulp.src('app/sass/styles.scss')
		.pipe( pls.rubySass() )
		.on('error', errorLog) //Watch for errors and console.log them
		.pipe( pls.csscomb() )
		.pipe( autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', { map: true }) )
		.pipe( gulp.dest('.tmp/css') )
		.pipe( pls.connect.reload() )
		.pipe( pls.notify('Sass compile complete!') );
});

//Fonts
gulp.task('fonts', function () {
	return gulp.src('app/sass/base/fonts/**/*')
		.pipe( gulp.dest('.tmp/css/fonts') )
		.pipe( gulp.dest('dist/css/fonts') );
});

//Scripts
gulp.task('js', function () {
	return gulp.src('app/js/**/*')
		.pipe(pls.stripDebug())
		.pipe(pls.jshint('.jshintrc'))
		.pipe(pls.jshint.reporter('default'))
		.on('error', errorLog) //Watch for errors and console.log them
		.pipe(pls.order([
			'app/js/easing.js',
			'app/js/slider.js',
			'app/js/select.js'
		]))
		.pipe(pls.concat('app.js'))
		// .pipe(pls.uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe( pls.connect.reload() )
		.pipe( pls.notify('JS compile complete!') );
});

//PHP Libs
gulp.task('php', function () {
	return gulp.src('app/vendor/**/*')
		.pipe(gulp.dest('dist/vendor'));
});

//PHP Mailer
gulp.task('mailer', function () {
	return gulp.src('app/mailer/**/*')
		.pipe(gulp.dest('dist/mailer'));
});

//Server
gulp.task('webserver', function () {
	pls.connect.server({
		root: ['.', '.tmp', 'app'],
		livereload: true
	});
});

//Clean
gulp.task('clean', function () {
	return gulp.src(['.tmp', 'dist'], {read: false})
		.pipe( pls.clean() );
});

//Clear Cache
gulp.task('clearCache', function (done) {
	return pls.cache.clearAll(done);
});

//Watch
gulp.task('watch', function () {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/**/*.html', ['html']);
	gulp.watch('app/images/**/*.{png,gif,jpg}', ['images']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/vendor/**/*', ['php']);
	gulp.watch('app/mailer/**/*.php', ['mailer']);
});

//Default Task
gulp.task('default', ['clearCache', 'clean', 'webserver', 'sass'], function () {
	gulp.start('html', 'images', 'fonts', 'js', 'php', 'mailer', 'watch');
});

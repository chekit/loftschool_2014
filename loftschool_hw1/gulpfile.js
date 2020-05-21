var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	cache = require('gulp-cache'),
	del = require('del'),
	jsmin = require('gulp-jsmin'),
	jshint = require('gulp-jshint'),
	rename = require("gulp-rename"),
	notify = require('gulp-notify'),
	csscomb = require('gulp-csscomb'),
	imagemin = require('gulp-imagemin'),
	pngcrush = require('imagemin-pngcrush'),
	minifyCSS = require('gulp-minify-css'),
	autoprefixer = require('gulp-autoprefixer'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect');

//Web Server
gulp.task('webserver', function () {
	connect.server({
		livereload: true,
		root: ['./public_html/']
	});
});

//Clean Dirrectories / Clear Cache
gulp.task('clean', function (cb) {
	del(['public_html/images', 'public_html/css'], cb);
});

gulp.task('clearCache', function (done) {
  return cache.clearAll(done);
});

//Copy HTML
gulp.task('copyhtml', function () {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('public_html/'))
		.pipe(notify('Copy HTML complete!'));
});

//Copy JS
gulp.task('copyjquery', function () {
	return gulp.src('bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('public_html/js/libs'));
});

gulp.task('copyrespondJS', function () {
	return gulp.src('bower_components/respondJS/src/respond.js')
		.pipe(jsmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public_html/js/libs'));
});

gulp.task('copymodernizr', function () {
	return gulp.src('bower_components/modernizr/modernizr.js')
		.pipe(jsmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public_html/js/libs'));
});

gulp.task('html5shiv', function () {
	return gulp.src('bower_components/html5shiv/dist/html5shiv.min.js')
		.pipe(gulp.dest('public_html/js/libs'));
});

gulp.task('placeholder', function () {
	return gulp.src('bower_components/jquery-placeholder/jquery.placeholder.js')
		.pipe(jsmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public_html/js/libs'));
});

gulp.task('copyJSlibs', function () {
	gulp.start('copyjquery', 'copymodernizr', 'html5shiv', 'copyrespondJS', 'placeholder');
});

//Copy Fonts
gulp.task('copyfonts', function () {
	return gulp.src('src/sass/base/fonts/**/*')
		.pipe(gulp.dest('public_html/css/fonts'));
});

//Sass compile
gulp.task('sass', function () {
	return gulp.src('src/sass/**/*.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(csscomb())
		.pipe(gulp.dest('public_html/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public_html/css'))
		.pipe(notify('Sass compile complete!'));
});

gulp.task('sassIE', function () {
	return gulp.src('src/sassIE/**/*.scss')
		.pipe(sass({
			style: 'expanded'
		}))
		.pipe(rename({ suffix: '.ie' }))
		.pipe(gulp.dest('public_html/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public_html/css'))
		.pipe(notify('Sass IE compile complete!'));
});

//Scripts compile
gulp.task('scripts', function () {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(jsmin())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('public_html/js'))
		.pipe(notify('JS compile complete!'));
});

//Images compress
gulp.task('images', function () {
	return gulp.src('src/images/**/*.{jpg,png,gif}')
		.pipe( cache( imagemin({
			optimizationLevel: 5,
			progressive: true,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngcrush({ reduce: true })]
		}) ))
		.pipe(gulp.dest('public_html/images'));
});

//Build Project
gulp.task('cleanDist', function (cb) {
	del(['dist/images', 'dist/css', 'dist/js'], cb);
});

gulp.task('distImgs', function () {
	return gulp.src('public_html/images/**/*')
		.pipe(gulp.dest('dist/images'));
});

gulp.task('distCSS', function () {
	return gulp.src('public_html/css/**/*.min*')
		.pipe(gulp.dest('dist/css'));
});

gulp.task('distJS', function () {
	return gulp.src('public_html/js/**/*.min*')
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['clearCache', 'cleanDist'], function () {
	gulp.start('distImgs', 'distCSS', 'distJS');
});

//Watch Any Edits
gulp.task('watch', function () {
	//livereload
	livereload.listen();

	//watch .html files
	gulp.watch('src/*.html', ['copyhtml']);

	//watch .scss files
	gulp.watch('src/sass/**/*.scss', ['sass']);

	//watch js manipulations
	gulp.watch('src/js/**/*.js', ['scripts']);

	//watch images
	gulp.watch('src/images/**/*.{jpg,png,gif}', ['images']);

	//watch src/ and reload on any file change
	gulp.watch(['public_html/**/*']).on('change', livereload.changed);
});

gulp.task('default', ['clearCache', 'clean', 'webserver'], function() {
	gulp.start('copyhtml', 'images', 'copyJSlibs', 'copyfonts', 'sass', 'scripts', 'watch');
});
'use strict';

var gulp = require('gulp'),
	pls = require('gulp-load-plugins')(),
	gulpif = require('gulp-if'),
	del = require('del');

var paths = {
	dist  	: './dist',
	css 	: './dist/css',
	js 		: './dist/js',
	img 	: './dist/images'
};

//Clear Directories
gulp.task('clear_dist', function (done) {
	del([paths.dist], done);
	console.info('=== Clear ./dist ===');
});

//Copy Images
gulp.task('images', function () {
	return gulp.src('./app/images/**/*')
		.pipe( gulp.dest(paths.img) )
		.pipe(pls.notify('Images complete!'));
});

//==== COPY HTML (START)
gulp.task('html', ['includes_html', 'fonts_html'], function () {
	var assets,
		jsFilter = pls.filter('**/*.js'),
  		cssFilter = pls.filter('**/*.css');

	return gulp.src('./app/*.html')
		.pipe(assets = pls.useref.assets())
		.pipe(jsFilter)
			.pipe(pls.ngAnnotate())
			.pipe(pls.uglify({preserveComments: pls.uglifySaveLicense}))
			// .pipe( pls.uglify() )
		.pipe(jsFilter.restore())
		.pipe(cssFilter)
			.pipe( pls.minifyCss() )
		.pipe(cssFilter.restore())
	    .pipe(assets.restore())
	    .pipe(pls.useref())
		.pipe(gulp.dest(paths.dist))
		.pipe( pls.notify('HTML Complete') );
});

gulp.task('includes_html', function () {
	return gulp.src('./app/includes/*.html')
		.pipe(gulp.dest(paths.dist + '/includes'));
});

gulp.task('fonts_html', function () {
	return gulp.src('./app/css/fonts/**/*')
		.pipe(gulp.dest(paths.css + '/fonts'));
});
//==== COPY HTML (END)

//==== COPY JS (START)
gulp.task('js_html', function() {
    return gulp.src('./app/js/*.js')
    	.pipe(gulp.dest( paths.js ));
});
//==== COPY JS (END)

gulp.task('build', ['clear_dist'], function () {
	gulp.start('html', 'images');
});
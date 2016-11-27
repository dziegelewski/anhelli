require('es6-promise').polyfill();
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var minifyhtml = require('gulp-htmlmin');
var plumber = require('gulp-plumber')

// var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');

var gulpIf = require('gulp-if');


gulp.task('default', function(callback) {
	runSequence('change', 'csschange', 'browserSync', callback)
	gulp.watch('app/scss/*.scss', ['csschange']);
	gulp.watch("dist/*.html").on('change', browserSync.reload);

	gulp.watch('app/js/*.js', ['change']);
	gulp.watch('app/index.html', ['change']);
});

gulp.task('change', function(callback) {
	runSequence('htmlchange', 'jschange', 'jshint', callback)
});


gulp.task('htmlchange', function() {
	return gulp.src('app/*.html')
	.pipe(plumber())
	.pipe(useref())
	.pipe(minifyhtml({
		empty: true,
		removeComments: true,
		collapseWhitespace: true,
		preserveLineBreaks: true,
	}))
	.pipe(gulp.dest('dist'))
});

gulp.task('jschange', function () {
	return gulp.src('dist/js/main.min.js')
	.pipe(plumber())
	.pipe(babel({
		presets: ['es2015']
	}))
	.pipe(uglify())

	.pipe(gulp.dest('dist/js'))
});

gulp.task('jshint', function() {
	return gulp.src('app/js/*.js')
	.pipe(jshint({
		"esversion": 6
	}))
	.pipe(jshint.reporter('default'))
})



gulp.task('csschange', function () {
	gulp.src('app/scss/*.scss')
	.pipe(plumber())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(autoprefixer({
        browsers: ['last 7 versions'],
        cascade: false
   }))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}))
});


gulp.task('browserSync', function() {
	browserSync.init({
		server: {
			baseDir: 'dist'
		}
	})
})


gulp.task('imagemin', function() {
	return gulp.src('app/images/**/*.+(png|jpg|gif|svg')
	.pipe(cache(imagemin()))
	.pipe(gulp.dest('dist/images'))
})
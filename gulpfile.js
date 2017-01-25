var gulp = require('gulp');
var clean = require('gulp-clean');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var sourceMaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');

gulp.task('clean-styles', function() {
	return gulp.src('./build/css', { read: false }).pipe(clean());
});

gulp.task('clean-scripts', function() {
	return gulp.src('./build/scripts', { read: false }).pipe(clean());
});

gulp.task('watch-styles', ['build-styles'], function() {
	browserSync.reload();
});

gulp.task('watch-scripts', ['build-changed-scripts-only'], function() {
	browserSync.reload();
});

gulp.task('watch-html', ['build-html'], function() {
	browserSync.reload();
});

var browserifyScripts = function() {
	return browserify({
		entries: './src/scripts/app.jsx', extensions: ['.jsx'], debug: true
	})	
};

var babelifyScripts = function(stream) {
	return stream.transform(babelify.configure({
		presets: ['es2015', 'react'],
		plugins: ['transform-class-properties']
	}))
	.bundle()
	.on('error', function(error) {
		console.log(error.message);
		notify().write(error);
		return;
	})
	.pipe(source('bundle.min.js'))
	.pipe(buffer())
	.pipe(sourceMaps.init({ loadMaps: true }))
	.pipe(uglify())
	.pipe(sourceMaps.write('./'))
	.pipe(gulp.dest('./build/scripts/'))
};

gulp.task('build-changed-scripts-only', function() {
	return babelifyScripts(watchify(browserifyScripts()));
});

gulp.task('build-scripts', ['clean-scripts'], function() {
	return babelifyScripts(browserifyScripts());
});

gulp.task('build-styles', ['clean-styles'], function() {
	return gulp.src('./src/styles/main.scss')
		.pipe(sourceMaps.init())
		.pipe(sass()).on('error', sass.logError)
		.pipe(sourceMaps.write())
		.pipe(gulp.dest('./build/css'));
});

gulp.task('build', ['build-styles', 'build-scripts'], function() {
	var sources = gulp.src(['./build/scripts/bundle.min.js'], { read: false });
	return gulp.src('./src/index.html')
		.pipe(inject(sources, { addRootSlash: false, ignorePath: 'build' }))
		.pipe(gulp.dest('./build/'));
});

gulp.task('sync', ['build'], function() {
	browserSync.init({
		server: {
			files: ['./css/*.css', './scripts/*.js', './index.html'],
			baseDir: 'build'
		}
	});
});

gulp.task('run', ['sync'], function() {
	gulp.watch('src/styles/**/*.scss', ['watch-styles']);
	gulp.watch('src/scripts/**/*.jsx', ['watch-scripts']);
	gulp.watch('src/index.html', ['watch-html']);
});

gulp.task('default', ['run']);
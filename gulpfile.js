var gulp = require("gulp");
var browserSync = require('browser-sync').create();
// css
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var sourcemaps = require('gulp-sourcemaps');
// js
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var postcssFlexbugsFixes = require('postcss-flexbugs-fixes');

gulp.task('server', ['sass', 'build'], function () {
	browserSync.init({
		server: "./dist/"
	});
});

gulp.task('sass', function () {
	gulp.src('src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(postcss([autoprefixer({
			browsers: ['last 5 versions']
		}),postcssFlexbugsFixes()]))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('build', function () {
	browserify({
			'entries': ['./src/js/main.js']
		})
		.bundle()
		.on('error', function (err) {
			console.log(err.message)
			this.emit('end')
		})
		.pipe(plumber())
		.pipe(source('./dist/js/app.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest('./'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
gulp.task('watch', function () {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch(["src/js/**/*.js", "src/js/**/*.vue"], ["build"]);
	gulp.watch('src/js/**/*.js');
	gulp.watch('dist/**/*.html').on('change', browserSync.reload);
})
gulp.task('default', ['watch', 'server']);
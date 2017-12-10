var gulp = require("gulp"),
	gutil = require("gulp-util"),
	browserify = require("gulp-browserify"),
	concat = require("gulp-concat"),
	sass = require("gulp-sass");

var jsSources = [
	"components/scripts/hello.js",
	"components/scripts/world.js"
];

var sassSources = ["components/sass/style.scss"];

gulp.task("js", function() {
	gulp.src(jsSources)
		.pipe(concat("main.js"))
		.pipe(browserify())
		.pipe(gulp.dest("builds/development/js"))
});

gulp.task("sass", function() {
	return gulp.src(sassSources)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('builds/development/css'));
});
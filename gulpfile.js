var gulp = require("gulp"),
	gutil = require("gulp-util"),
	browserify = require("gulp-browserify"),
	connect = require("gulp-connect"),
	concat = require("gulp-concat"),
	sass = require("gulp-sass");

var jsSources = [
	"components/scripts/hello.js",
	"components/scripts/world.js"
];

var sassSources = ["components/sass/style.scss"];
var htmlSources = ["builds/development/*.html"];

gulp.task("js", function() {
	return gulp.src(jsSources)
		.pipe(concat("main.js"))
		.pipe(browserify())
		.pipe(gulp.dest("builds/development/js"))
		.pipe(connect.reload())
});

gulp.task("sass", function() {
	return gulp.src(sassSources)
		.pipe(sass({outputStyle: "expanded"})
			.on('error', sass.logError))
		.pipe(gulp.dest('builds/development/css'))
		.pipe(connect.reload())
});

gulp.task("watch", function() {
	gulp.watch(jsSources, ["js"]);
	gulp.watch("components/sass/*.scss", ["sass"]);
	gulp.watch(htmlSources, ["html"]);
});

gulp.task("connect", function() {
	connect.server({
		root: 'builds/development',
		livereload: true
	})
});

gulp.task("html", function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

gulp.task("default", ["html", "js", "sass", "connect", "watch"])


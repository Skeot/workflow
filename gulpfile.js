const gulp = require("gulp"),
	  gutil = require("gulp-util"),
	  browserify = require("gulp-browserify"),
	  concat = require("gulp-concat");

var jsSources = [
	"components/scripts/hello.js",
	"components/scripts/world.js"
];

gulp.task("js", function() {
	gulp.src(jsSources)
		.pipe(concat("main.js"))
		.pipe(browserify())
		.pipe(gulp.dest("builds/development/js"))
});
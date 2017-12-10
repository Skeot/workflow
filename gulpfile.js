const gulp = require("gulp"),
	  gutil = require("gulp-util");

gulp.task("log", function() {
	gutil.log("This is a test");
});
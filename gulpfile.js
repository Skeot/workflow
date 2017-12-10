var gulp = require("gulp"),
	gutil = require("gulp-util"),
	browserify = require("gulp-browserify"),
	connect = require("gulp-connect"),
	concat = require("gulp-concat"),
	sass = require("gulp-sass");

var env,
	jsSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

env = process.env.NODE_ENV || "development";

// Run production in terminal like this: $ NODE_ENV=production gulp

if (env === "development") {
	outputDir = "builds/development/";
	sassStyle = "expanded";
} else {
	outputDir = "builds/production/";
	sassStyle = "compressed";
}

jsSources = [
	"components/scripts/hello.js",
	"components/scripts/world.js"
];

sassSources = ["components/sass/style.scss"];
htmlSources = [outputDir + "*.html"];

gulp.task("js", function() {
	return gulp.src(jsSources)
		.pipe(concat("main.js"))
		.pipe(browserify())
		.pipe(gulp.dest(outputDir + "js"))
		.pipe(connect.reload())
});

gulp.task("sass", function() {
	return gulp.src(sassSources)
		.pipe(sass({outputStyle: sassStyle})
			.on('error', sass.logError))
		.pipe(gulp.dest(outputDir + "css"))
		.pipe(connect.reload())
});

gulp.task("watch", function() {
	gulp.watch(jsSources, ["js"]);
	gulp.watch("components/sass/*.scss", ["sass"]);
	gulp.watch(htmlSources, ["html"]);
});

gulp.task("connect", function() {
	connect.server({
		root: outputDir,
		livereload: true
	})
});

gulp.task("html", function() {
	gulp.src(htmlSources)
	.pipe(connect.reload())
});

gulp.task("default", ["html", "js", "sass", "connect", "watch"])


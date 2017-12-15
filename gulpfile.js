// To run the server type this: $ gulp
// Run production in terminal like this: $ NODE_ENV=production gulp

var gulp = require('gulp')
var connect = require('gulp-connect')
var concat = require('gulp-concat')
var gulpif = require('gulp-if')
var uglify = require('gulp-uglify')
var minifyHTML = require('gulp-minify-html')
var sass = require('gulp-sass')
var babel = require('gulp-babel')

var env
var jsSources
var sassSources
var outputDir
var sassStyle

env = process.env.NODE_ENV || 'development'

if (env === 'development') {
  outputDir = 'builds/development/'
  sassStyle = 'expanded'
} else {
  outputDir = 'builds/production/'
  sassStyle = 'compressed'
}

jsSources = [
  'components/scripts/hello.js',
  'components/scripts/world.js'
]

sassSources = ['components/sass/style.scss']

gulp.task('js', function () {
  return gulp.src(jsSources)
    .pipe(concat('main.js'))
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest(outputDir + 'js'))
    .pipe(connect.reload())
})

gulp.task('sass', function () {
  return gulp.src(sassSources)
    .pipe(sass({outputStyle: sassStyle})
      .on('error', sass.logError))
    .pipe(gulp.dest(outputDir + 'css'))
    .pipe(connect.reload())
})

gulp.task('watch', function () {
  gulp.watch(jsSources, ['js'])
  gulp.watch('components/sass/*.scss', ['sass'])
  gulp.watch('builds/development/*.html', ['html'])
})

gulp.task('connect', function () {
  connect.server({
    root: outputDir,
    livereload: true
  })
})

gulp.task('html', function () {
  gulp.src('builds/development/*.html')
  .pipe(gulpif(env === 'production', minifyHTML()))
  .pipe(gulpif(env === 'production', gulp.dest(outputDir)))
  .pipe(connect.reload())
})

gulp.task('default', ['html', 'js', 'sass', 'connect', 'watch'])

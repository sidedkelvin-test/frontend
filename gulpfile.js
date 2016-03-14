var gulp = require('gulp')
var clean = require('gulp-clean')
var uglify = require('gulp-uglify')
var rename = require('gulp-rename')
var ngAnnotate = require('gulp-ng-annotate')

gulp.task('clean', function () {
  return gulp.src('dist/', {read: false})
    .pipe(clean())
})

gulp.task('build', ['clean'], function () {
  return gulp.src('lib/angular-progress-pie.js')
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/'))
})

gulp.task('default', ['clean', 'build'])

'use strict';
var gulp = require('gulp');

gulp.task('sass', function () {
  var sourcemaps = require('gulp-sourcemaps');
  var sass = require('gulp-sass');
  var autoprefixer = require('gulp-autoprefixer');
  var browserSync = require('browser-sync');
  var notify = require('gulp-notify');
  
  var config = require('../config').sass;

  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(sass(config.options))
      .on('error', notify.onError())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({ browsers: ['last 2 version'] }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({ stream: true }));
});

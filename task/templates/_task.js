'use strict';
var gulp = require('gulp');

gulp.task('<%= name %>', function () {
  var <%= requires.join(';\n  var ') %>;

  var config = require('../config').<%= name %>;

  return gulp.src(config.src)
    .pipe(<%= pipes.join(')\n    .pipe(') %>);
});

'use strict';
var gulp = require('gulp');

gulp.task('<%= name %>', function () {
  <%= requires.join('\n  ') %>
  
  var config = require('../config').<%= name %>;

  return gulp.src(config.src)
    <%= pipes.join('\n    ') %>;
});

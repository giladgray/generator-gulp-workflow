gulp = require('gulp')

gulp.task '<%= name %>', ->
  <%= requires.join('\n  ') %>

  config = require('../config').<%= name %>

  gulp.src(config.src)
    .pipe <%= pipes.join('\n    .pipe ') %>

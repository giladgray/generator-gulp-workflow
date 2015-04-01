gulp = require 'gulp'

gulp.task '<%= name %>', ->
  changed = require 'gulp-changed'
  <% _.forEach(plugins, function(plugin) { %><%= plugin.task %> = require '<%= plugin.package %>'
  <% }); %>notify = require 'gulp-notify'
  count = require 'gulp-count'

  config = require('../config').<%= name %>

  gulp.src config.src
    .pipe changed()
    <% _.forEach(plugins, function(plugin) { %>.pipe <%= plugin.task %>()
    <% }); %>  .on 'error', notify.onError()
    .pipe gulp.dest(config.dest)
    .pipe count('## <%= name %> files compiled.')

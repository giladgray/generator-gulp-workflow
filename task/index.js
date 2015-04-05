'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

/*
 * A subgenerator to create a single gulp task. Expects the following options:
 *  - `name`: (String) name of task and config block
 *  - `language`: (js|coffee) task language, determines filename
 *  - `steps`: (Array<Step>) steps in the task, see below for step definition.
 *
 * A `Step` is a single `.pipe()` statement and takes the following output form:
 * ```
 *   .pipe(plugin[.command]([options]))
 *     [.on('error', notify.onError())]
 * ```
 *
 * A single step can be configured using an object with some or all of the following properties,
 * optional unless otherwise noted:
 *  - `plugin`: (String) **required** name of plugin that provides the step
 *  - `command`: (String) command to call on plugin
 *  - `options`: (String) command options, must be a string for now
 *  - `require`: (String) dependency name, if different from "gulp-#{plugin}", or false to omit
 *  - `error`: (Boolean) whether step can error, will add `.on('error', notify.onError())`
 */
module.exports = yeoman.generators.Base.extend({
  initializing: function () {
  },

  writing: function () {
    var name = this.options.name;
    var language = this.options.language;
    var isJS = (language === 'js');
    var steps = this.options.steps;

    var filename = 'gulp/tasks/' + name + '.' + language;

    // construct array of require() statements
    var requires = this._.chain(steps)
      .map(function(step) {
        if (step.plugin === 'gulp' || step.require === false) { return false; }
        return step.plugin + ' = require(\'' + (step.require || 'gulp-' + step.plugin) + '\')';
      })
      .compact()
      .unique()
      .value();
    // add dependency on gulp-notify if needed
    var hasError = this._.any(steps, 'error');
    if (hasError) {
      requires.push('notify = require(\'gulp-notify\')');
    }

    // construct array of .pipe() statements
    var pipes = steps.map(function (step) {
      var command = step.plugin + (step.command ? '.' + step.command : '');
      var options = step.options || '';
      var line = command + '(' + options + ')';
      // add error handling if necessary
      if (step.error) {
        line += (isJS ? ')' : '') + '\n      .on' + (isJS ? '(' : ' ') + '\'error\', notify.onError()';
      }
      return line;
    });

    this.fs.copyTpl(
      this.templatePath('_task.' + language),
      this.destinationPath(filename),
      {
        name: name,
        requires: requires,
        pipes: pipes
      }
    );
  }
});

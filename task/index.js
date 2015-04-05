'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.writeTask = function(spec) {
      if (!spec) { return; }
      var filename = 'gulp/tasks/' + spec.name + '.' + spec.language;
      console.log('Writing ' + filename);

      var requires = this._.chain(spec.steps)
        .map(function(step) {
          if (step.plugin === 'gulp' || step.dep === false) { return false; }
          return step.plugin + ' = require(\'' + (step.dep || 'gulp-' + step.plugin) + '\')';
        })
        .compact()
        .unique()
        .value();
      var hasError = this._.any(spec.steps, 'error');
      if (hasError) {
        requires.push('notify = require(\'gulp-notify\')');
      }
      if (spec.language === 'js') {
        requires = requires.map(function (req) { return 'var ' + req + ';'; });
      }

      var pipes = spec.steps.map(function (step) {
        var command = step.plugin + (step.command ? '.' + step.command : '');
        var options = step.options || '';
        var line = '.pipe(' + command + '(' + options + '))';
        if (step.error) { line += '\n      .on(\'error\', notify.onError())'; }
        return line;
      });

      this.fs.copyTpl(
        this.templatePath('_task.' + spec.language),
        this.destinationPath(filename),
        {
          name: spec.name,
          requires: requires,
          pipes: pipes
        }
      );
    };
  },

  // prompting: function () {
  //   var done = this.async();
  //
  //   // Have Yeoman greet the user.
  //   this.log(yosay(
  //     'Welcome to the cat\'s meow ' + chalk.red('GulpWorkflow') + ' generator!'
  //   ));
  //
  //   var prompts = [{
  //     type: 'list',
  //     name: 'scripts',
  //     message: 'What language would you like to use for scripts?',
  //     choices: tasks.scripts,
  //   }, {
  //     type: 'list',
  //     name: 'styles',
  //     message: 'What language would you like to use for stylesheets?',
  //     choices: tasks.styles,
  //   }, {
  //     type: 'list',
  //     name: 'templates',
  //     message: 'What language would you like to use for templates?',
  //     choices: tasks.templates,
  //   }, {
  //     type: 'checkbox',
  //     name: 'others',
  //     message: 'What other tasks would you like?',
  //     choices: tasks.others
  //   }];
  //
  //   this.prompt(prompts, function (props) {
  //     this._.extend(this, props);
  //     done();
  //   }.bind(this));
  // },

  writing: {
    task: function () {
      console.log(this.options);
      this.writeTask(this.options);
    }
  }
});

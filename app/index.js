'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var tasks = require('./tasks.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    this.writeTask = function(spec) {
      if (!spec) { return; }
      this.fs.copyTpl(
        this.templatePath('_task.coffee'),
        this.destinationPath('gulp/tasks/' + spec.command + '.coffee'),
        {
          name: spec.command,
          plugins: spec.deps.map(function(pkg) {
            var command = pkg.split('-')[1]; // TODO: gulp-two-parts
            return {
              task: command,
              package: pkg
            };
          })
        }
      );
    };
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s meow ' + chalk.red('GulpWorkflow') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'scripts',
      message: 'What language would you like to use for scripts?',
      choices: tasks.scripts,
    }, {
      type: 'list',
      name: 'styles',
      message: 'What language would you like to use for stylesheets?',
      choices: tasks.styles,
    }, {
      type: 'list',
      name: 'templates',
      message: 'What language would you like to use for templates?',
      choices: tasks.templates,
    }, {
      type: 'checkbox',
      name: 'others',
      message: 'What other tasks would you like?',
      choices: tasks.others
    }];

    this.prompt(prompts, function (props) {
      this._.extend(this, props);
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    scripts: function() {
      this.writeTask(this.scripts);
    },

    styles: function() {
      this.writeTask(this.styles);
    },

    templates: function() {
      this.writeTask(this.templates);
    },

    others: function() {

    },

    config: function() {
      this.fs.copyTpl(
        this.templatePath('_config.coffee'),
        this.destinationPath('gulp/config.coffee'),
        {
          tasks: [
            this.scripts,
            this.styles,
            this.templates
          ].concat(this.others)
        }
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: true // this.options['skip-install']
    });
  }
});

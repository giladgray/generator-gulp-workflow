'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var tasks = require('../tasks.js');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s meow ' + chalk.red('Gulp Workflow') + ' generator!'
    ));
  },

  prompting: function () {
    var done = this.async();

    var prompts = this._.chain(tasks)
      .mapValues(function (task, taskName) {
        task.task = taskName;
        return {
          name: task.name,
          value: task
        };
      })
      .groupBy(function(t) { return t.value.type; })
      .map(function (tasks, type) {
        if (type === 'undefined') {
          return {
            type: 'checkbox',
            name: 'others',
            message: 'What other tasks would you like?',
            choices: tasks
          };
        }
        tasks.push({ name: chalk.gray('none'), value: false });
        return {
          type: 'list',
          name: type,
          message: 'What language would you like to use for ' + chalk.yellow(type) + '?',
          choices: tasks
        };
      })
      .value();

    prompts.push({
      type: 'list',
      name: 'language',
      message: 'In what language shall we write your ' + chalk.yellow('Gulp tasks') + '?',
      choices: [{name: 'JavaScript', value: 'js'}, {name: 'CoffeeScript', value: 'coffee'}]
    });

    this.prompt(prompts, function (props) {
      this._.extend(this, props);
      this.allTasks = this._.compact([this.scripts, this.styles, this.templates].concat(this.others));
      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      // sorted, unique list of plugins used in each step of all tasks.
      // versions are all * for now, until we figure out a way to specify it.
      var deps = this._.chain(this.allTasks)
        .pluck('steps')
        .flatten()
        .filter(function(step) { return step.plugin !== 'gulp'; })
        .map(function (step) { return step.require || 'gulp-' + step.plugin; })
        .unique()
        .map(function (req) { return '"' + req + '": "*",'; })
        .value();
      deps.sort();

      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          deps: deps
        }
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

    tasks: function() {
      this._.each(this.allTasks, function (task) {
        task.language = this.language;
        this.composeWith('gulp-workflow:task', { options: task },
          { local: require.resolve('../task/') });
      }.bind(this));
    },

    config: function() {
      this.fs.copyTpl(
        this.templatePath('_config.coffee'),
        this.destinationPath('gulp/config.coffee'),
        {
          tasks: this.allTasks
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

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

    tasks: function() {
      var allTasks = this._.compact([this.scripts, this.styles, this.templates].concat(this.others));
      this._.each(allTasks, function (task) {
        task.language = this.language;
        this.composeWith('gulp-workflow:task', {options: task}, {local: require.resolve('../task/')});
      }.bind(this));
    },

    others: function() {

    }

    // config: function() {
    //   this.fs.copyTpl(
    //     this.templatePath('_config.coffee'),
    //     this.destinationPath('gulp/config.coffee'),
    //     {
    //       tasks: [
    //         this.scripts,
    //         this.styles,
    //         this.templates
    //       ].concat(this.others)
    //     }
    //   );
    // }
  },

  install: function () {
    this.installDependencies({
      skipInstall: true // this.options['skip-install']
    });
  }
});

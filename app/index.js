'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the cat\'s meow ' + chalk.red('GulpWorkflow') + ' generator!'
    ));

    var prompts = [{
      type: 'list',
      name: 'styles',
      message: 'What language would you like to use for stylesheets?',
      choices: ['Sass', 'Less', 'CSS', 'none'],
      default: 'Sass'
    }, {
      type: 'list',
      name: 'scripts',
      message: 'What language would you like to use for scripts?',
      choices: ['CoffeeScript', 'TypeScript', 'JavaScript', 'none'],
      default: 'CoffeeScript'
    }, {
      type: 'list',
      name: 'templates',
      message: 'What language would you like to use for templates?',
      choices: ['Handlebars', 'Jade', 'Lodash', 'none'],
      default: 'Handlebars'
    }];

    this.prompt(prompts, function (props) {
      this.someOption = props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
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
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});

module.exports = {
  scripts: [
    {
    name: 'CoffeeScript',
      value: {
        command: 'coffee',
        glob: '*.{lit,}coffee',
        deps: ['gulp-coffee', 'gulp-coffeelint']
      }
    }, {
      name: 'TypeScript',
      value: {
        command: 'ts',
        glob: '*.ts',
        deps: ['gulp-ts', 'gulp-tslint']
      }
    }, {
      name: 'JavaScript',
      value: {
        command: 'js',
        glob: '*.js',
        deps: ['gulp-jshint']
      }
    }, {
      name: 'none',
      value: null
    }
  ],

  styles: [
    {
      name: 'Sass',
      value: {
        command: 'sass',
        glob: '*.{sass,scss}',
        deps: ['gulp-sass', 'gulp-scsslint']
      }
    }, {
      name: 'Less',
      value: {
        command: 'less',
        glob: '*.less',
        deps: ['gulp-less']
      }
    }, {
      name: 'CSS',
      value: {
        glob: '*.css'
      }
    }, {
      name: 'none',
      value: null
    }
  ],

  templates: [
    {
      name: 'Handlebars',
      value: {
        command: 'handlebars',
        glob: '*.{hbs,handlebars}',
        deps: ['gulp-wrap', 'gulp-handlebars']
      }
    }, {
      name: 'Jade',
      value: {
        command: 'jade',
        glob: '*.jade',
        deps: ['gulp-jade']
      }
    }, {
      name: 'Lodash',
      value: {
        command: 'lodash',
        glob: '*.{html,ejs}',
        deps: ['lodash']
      }
    }, {
      name: 'none',
      value: null
    }
  ],

  others: [
    {
      name: 'Clean',
      value: {
        command: 'clean'
      }
    }, {
      name: 'Copy',
      value: {
        command: 'copy'
      }
    }, {
      name: 'Deploy',
      value: {
        command: 'deploy'
      }
    }
  ]
};

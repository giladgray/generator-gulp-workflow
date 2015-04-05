module.exports = {
  coffee: {
    type: 'scripts',
    name: 'CoffeeScript',
    task: 'coffee',
    glob: '*.{lit,}coffee',
    steps: [
      { plugin: 'coffeelint', error: true },
      { plugin: 'coffee', options: 'config.options', error: true },
      { plugin: 'gulp', command: 'dest', options: 'config.dest' }
    ]
  },

  js: {
    type: 'scripts',
    name: 'JavaScript',
    task: 'js',
    glob: '*.js',
    steps: [
      { plugin: 'jshint', error: true },
      { plugin: 'gulp', command: 'dest', options: 'config.dest' }
    ]
  },

  less: {
    type: 'styles',
    name: 'Less',
    glob: '*.less',
    steps: [
      { plugin: 'sourcemaps', command: 'init' },
      { plugin: 'less', options: 'config.options', error: true },
      { plugin: 'sourcemaps', command: 'write' },
      { plugin: 'autoprefixer', options: '{ browsers: [\'last 2 version\'] }' },
      { plugin: 'gulp', command: 'dest', options: 'config.dest' },
      { plugin: 'browserSync', command: 'reload', options: '{ stream: true }', require: 'browser-sync' }
    ]
  },

  sass: {
    type: 'styles',
    name: 'Sass',
    glob: '*.{sass,scss}',
    steps: [
      { plugin: 'sourcemaps', command: 'init' },
      { plugin: 'sass', options: 'config.options', error: true },
      { plugin: 'sourcemaps', command: 'write' },
      { plugin: 'autoprefixer', options: '{ browsers: [\'last 2 version\'] }' },
      { plugin: 'gulp', command: 'dest', options: 'config.dest' },
      { plugin: 'browserSync', command: 'reload', options: '{ stream: true }', require: 'browser-sync' }
    ]
  },

  handlebars: {
    type: 'templates',
    name: 'Handlebars',
    glob: '*.{hbs,handlebars}',
    steps: [

    ]
  },

  deploy: {
    name: 'Deploy to GitHub Pages',
    task: 'deploy',
    glob: '*.*',
    steps: [
      { plugin: 'deploy', options: 'config.options', require: 'gulp-gh-pages' }
    ]
  }
};

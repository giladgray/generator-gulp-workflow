'use strict';
/* global describe, it, before */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

var tasks = require('../tasks.js');

var TEST_DIR = path.join(os.tmpdir(), './temp-test');

describe('gulp-workflow:app', function () {
  this.timeout(5000);

  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(TEST_DIR)
      .withOptions({ 'skip-install': true })
      .withPrompt({
        scripts  : tasks.coffee,
        styles   : tasks.sass,
        language : 'js'
      })
      .on('end', done);
  });

  it('creates project files', function () {
    assert.file([
      '.editorconfig',
      '.jshintrc'
    ]);
  });

  it('creates task files', function () {
    assert.file([
      'gulp/tasks/coffee.js',
      'gulp/tasks/sass.js',
    ]);
  });

  it('creates config files', function () {
    assert.fileContent('gulp/config.coffee', /coffee:/);
    assert.fileContent('gulp/config.coffee', /sass:/);
  });

  it('populate package.json', function () {
    assert.fileContent('package.json', /gulp-autoprefixer/);
    assert.fileContent('package.json', /gulp-coffee/);
    assert.fileContent('package.json', /gulp-sass/);
  });
});

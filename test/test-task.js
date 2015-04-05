'use strict';
/* global describe, it, before */

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');
var fs = require('fs');

var TEST_DIR = path.join(os.tmpdir(), './temp-test');

function defineTask(options, done) {
  helpers.run(path.join(__dirname, '../task'))
    .inDir(TEST_DIR)
    .withOptions(options)
    .on('end', done);
}

describe('gulp-workflow:task', function () {
  before(function (done) {
    var prompts = {
      name: 'sass',
      language: 'js',
      steps: [
        { plugin: 'sourcemaps', command: 'init' },
        { plugin: 'sass', options: 'config.options', error: true },
        { plugin: 'sourcemaps', command: 'write' },
        { plugin: 'autoprefixer', options: '{ browsers: [\'last 2 version\'] }' },
        { plugin: 'gulp', command: 'dest', options: 'config.dest' },
        { plugin: 'browserSync', command: 'reload', options: '{ stream: true }', require: 'browser-sync' }
      ]
    };
    defineTask(prompts, done);
  });

  it('writes js task file as expected', function () {
    assert.equal(
      fs.readFileSync(path.join(TEST_DIR, 'gulp/tasks/sass.js'), 'utf-8'),
      fs.readFileSync(path.join(__dirname, 'fixtures/sass.js'), 'utf-8')
    );
  });
});

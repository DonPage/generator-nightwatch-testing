'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');
//var yosay = require('yosay');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');
var fs = require('fs');


module.exports = yeoman.generators.Base.extend({
  constructor: function (args, options, config) {
    var testLocal;

    yeoman.generators.Base.apply(this, arguments);

    this.nightwatch = {

    }


  },

  askFor: function (argument) {
    var self = this;
    var cb = this.async();

    var options = [];

    fs.readdir('pages', function (err, files) {
      if (err) return;

      files.forEach(function(f) {
        options.push(f.split('.')[0]);
      });

      var prompts = [
        {
          name: 'title',
          message: 'Title of test',
          default: 'ShopCheckout'
        },
        {
          type: 'checkbox',
          name: 'pages',
          message: 'What pages do you want to include?',
          choices: options
        }
      ];

      self.prompt(prompts, function (answers) {

        self.nightwatch.title = answers.title.replace(/\"/g, '\\"');
        self.nightwatch.pages = answers.pages;
        cb();
      }.bind(self))
    });

  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('_test.js'),
      this.destinationPath('./tests/' + this.nightwatch.title + '.js'),
      {
        title: this.nightwatch.title,
        pages: this.nightwatch.pages
      }
    );
  }
});

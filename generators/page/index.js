'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
//var chalk = require('chalk');
//var yosay = require('yosay');
var _s = require('underscore.string');
var mkdirp = require('mkdirp');


module.exports = yeoman.generators.Base.extend({
  constructor: function (args, options, config) {
    var testLocal;

    yeoman.generators.Base.apply(this, arguments);

    this.nightwatch = {

    }


  },

  askFor: function (argument) {
    var cb = this.async();

    var prompts = [
      {
        name: 'title',
        message: 'Title of page',
        default: 'Login'
      },
      {
        name: 'slug',
        message: 'URL Slug?',
        default: '/login'
      }
    ];


    this.prompt(prompts, function (answers) {

      this.nightwatch.title = answers.title.replace(/\"/g, '\\"');
      this.nightwatch.slug = answers.slug;
      console.log("Creating:", this.slug, this.title);
      cb();
    }.bind(this))
  },

  writing: function () {
    console.log("this.nightwatch", this.nightwatch);
    this.fs.copyTpl(
      this.templatePath('_page.js'),
      this.destinationPath('./pages/' + this.nightwatch.title + '.js'),
      {
        slug: this.nightwatch.slug
      }
    );
  }
});

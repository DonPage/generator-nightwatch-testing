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
        name: 'name',
        message: 'Site title?',
        default: (this.appname) ? this.appname : 'testTitle'
      },
      {
        name: 'url',
        message: 'URL of website?',
        default: 'https://encryptyourself.com/'
      },
      {
        type: 'checkbox',
        name: 'folders',
        message: 'What folders would you like?',
        choices: [{
          name: 'Pages',
          value: 'pages',
          checked: true
        }, {
          name: 'Data',
          value: 'data',
          checked: true
        }, {
          name: 'Assertions',
          value: 'assertions',
          checked: true
        }, {
          name: 'Commands',
          value: 'commands',
          checked: true
        }]
      }
    ];


    this.prompt(prompts, function (answers) {
      var isChecked = function (choices, value) {
        return choices.indexOf(value) > -1;
      };

      this.appname = this.name = answers.name.replace(/\"/g, '\\"');
      console.log("this.appname", this.appname);
      this.nightwatch.custom_commands_path = isChecked(answers.folders, 'commands');
      this.nightwatch.custom_assertion_path = isChecked(answers.folders, 'assertions');
      this.nightwatch.data = isChecked(answers.folders, 'data');
      this.nightwatch.pages = isChecked(answers.folders, 'pages');
      this.nightwatch.url = answers.url.replace(/\/$/, "");

      cb();
    }.bind(this))
  },


  packageJSON: function () {
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: _s.slugify(this.appname)
      }
    );
  },

  editorConfig: function () {
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    );
  },

  readme: function () {
    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    )
  },

  nightwatch: function () {
    var nightwatch = {};

    console.log('cus_ass: ' + this.nightwatch.custom_assertion_path);

    this.fs.copyTpl(
      this.templatePath('_Nightwatch.js'),
      this.destinationPath('Nightwatch.js'),
      {
        assertions: this.nightwatch.custom_assertion_path,
        commands: this.nightwatch.custom_commands_path,
        pages: this.nightwatch.pages,
        data: this.nightwatch.data,
        url: this.nightwatch.url
      }
    );

  },

  globals: function () {
    console.log("this.url", this.nightwatch.url);
    //this.template('_package.json', path.resolve(this.nightwatch.url, 'package.json'));
    this.fs.copyTpl(
      this.templatePath('_globals.json'),
      this.destinationPath('globals.json'),
      this.nightwatch
    );
  },

  assertions: function () {
    if (this.nightwatch.custom_assertion_path) {
      mkdirp('assertions');
      this.fs.copyTpl(
        this.templatePath('_assertions/notContainsText.js'),
        this.destinationPath('assertions/notContainsText.js'),
        {
          assertions: this.nightwatch.custom_assertion_path
        }
      );
    }
  },


  commands: function () {
    if (this.nightwatch.custom_commands_path) {
      mkdirp('commands');
      this.fs.copyTpl(
        this.templatePath('_commands/tagCount.js'),
        this.destinationPath('commands/tagCount.js'),
        this.nightwatch
      );
    }
  },

  data: function () {
    if (this.nightwatch.data) {
      mkdirp('data');
      this.fs.copyTpl(
        this.templatePath('_data/config.js'),
        this.destinationPath('data/config.js'),
        this.nightwatch
      );
    }
  },

  pages: function () {
    if (this.nightwatch.pages) {
      mkdirp('pages');
      this.fs.copyTpl(
        this.templatePath('_pages/_homepage.js'),
        this.destinationPath('pages/homepage.js'),
        this.nightwatch
      );
    }
  },

  test: function () {
    mkdirp('tests');
    this.fs.copyTpl(
      this.templatePath('_tests/main.js'),
      this.destinationPath('tests/main.js'),
      this.nightwatch
    );
  },




  install: function () {
    this.installDependencies()
  }


});

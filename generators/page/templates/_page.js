
module.exports = {
  url: function () {
    return this.api.globals.urls.homepage + '<%= slug %>';
  },
  commands: [],
  elements: {
    searchBar: { selector: 'input[name=q]' },
    submitButton: { selector: '[type=submit]' }
  }
};

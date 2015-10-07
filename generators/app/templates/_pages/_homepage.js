module.exports = {
  load: function () {
    var url = this.client.globals.urls + '';

    return this.client
      .url(url)
      .waitForElementVisible('body', 1000);
  }
};

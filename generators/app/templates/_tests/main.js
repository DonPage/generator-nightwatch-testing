module.exports = {
  'Main': function (client) {
    client
      .url('<%= url %>')
      .waitForElementVisible('body', 5500)
      .pause(1000)
      .end();

  }
};

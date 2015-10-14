module.exports = {
  'Main': function (client) {
    var homePage = client.page.homepage();
    homePage.navigate();
    client
      .waitForElementVisible('body', 5500)
      .pause(2000)
      .end();

  }
};

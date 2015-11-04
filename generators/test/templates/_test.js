module.exports = {
  '<%= title %>': function (client) {

    <% pages.forEach(function(page){ %>
     var <%= page %> = client.page.<%= page %>();
    <% }); %>

    <%= pages[0] %>.navigate();
    client
      .waitForElementVisible('body', 5500)
      .pause(2000)
      .end();

  }
};

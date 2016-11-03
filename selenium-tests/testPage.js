/**
 * Sample automated test scenario for Nightwatch.js
 *
 * > it navigates to google.com and searches for nightwatch,
 *   verifying if the term 'The Night Watch' exists in the search results
 */


module.exports = {
  // This test is designed to see if the page loads properly

  'Test loading home page' : function (client) {
    client
      .url('http://localhost:8080')
      .waitForElementPresent('body', 1000);
  },

  // This test is designed to see that if we give it a search term that relates
  // to nothing in our archives it should return a empty list

  'Test search' : function(client) {
    client
      .expect.element('.list-group-item').to.be.present;
    client
      .expect.element('.docs-title-font').to.be.present;
    var title = "warc never changes";
    client.setValue('input[type=text]', [title, client.Keys.ENTER]);
    client
      .expect.element('.list-group-item').to.not.be.present;
  },

  // This test is designed to see if the images are populated properly when
  // clicking on the images tab

  'Test Images appear' : function(client) {
    client.click('#images');
    client.expect.element('img').to.be.present;
    client.end();
  }
};

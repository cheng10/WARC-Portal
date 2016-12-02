module.exports = {
  // This test is designed to see if the page loads properly

  'Test loading home page' : function (client) {
    client
      .url('http://localhost:5000')
      .waitForElementPresent('body', 1000);
  },

  // This test is designed to see that if we give it a search term that relates
  // to nothing in our archives it should return a empty list

  'Test search' : function(client) {
    client.expect.element('.list-group-item').to.be.present;
    client.expect.element('.docs-title-font').to.be.present;
    var title = "warc never changes";
    client.setValue('input[type=text]', [title, client.Keys.ENTER]);
    client.expect.element('.list-group-item').to.not.be.present;
    client.refresh();
    // filtering
    client.waitForElementVisible('.filter-box', 100000);
    client.expect.element('.filter-box').to.be.present;
    client.waitForElementVisible('li[id="amazon.com"]', 10000).click('a');
    client.expect.element('.docs-title-font').to.be.present;
    // date range
    client.refresh();
    var title0 = "11/1/2016";
    client.setValue('input[placeholder=From]', title0);
  },

  // This test is designed to see if the images are populated properly when
  // clicking on the images tab

  'Test Images' : function(client) {
    client.refresh();
    client.url('http://localhost:5000/images');
    client.expect.element('img').to.be.present;
    var title1 = "meepmeep"
    client.setValue('input[type=text]', [title1, client.Keys.ENTER]);
    // src should be blank, the query should return nothing.
    client.expect.element('img').to.not.be.present;
  },

  'Test Login & collections' : function(client){
    client.url('http://localhost:5000/login');
    var user = "testuser1";
    var pass = "cmput401";
    client.setValue('input[id=username]', user);
    client.setValue('input[type=password]', [pass, client.Keys.ENTER]);
    client.expect.element('.docs-title-font').to.be.present;
    //collections
    client.url('http://localhost:5000/collections');
    client.expect.element('.create-collection-list').to.be.present;
    var coll = "TEST COLL";
    client.setValue('input[name=collectionName]', coll);
    var file = "file1";
    client.setValue('input[role=combobox]', [file, client.Keys.ENTER]);
    client.click('.Select-arrow');
    client.expect.element('#submit').to.be.present;
    client.click('#submit');
    client.pause(1000);
    client.end();
  }
};

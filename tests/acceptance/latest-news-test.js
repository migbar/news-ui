import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | latest news');

test("I can view the list of articles", function(assert) {
  let articles = server.createList('article', 3);

  visit('/latest');

  andThen(() => {
    assert.equal(find('li').length, 3);
    assert.equal(find('li:first > .title').text().trim(), articles[0].title);
    assert.equal(find('li:first > .description').text().trim(), articles[0].description);
    assert.equal(find('li:first > img').attr('src'), articles[0].urlToImage);
  });
});

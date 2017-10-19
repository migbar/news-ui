import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | latest news');

test("I can view the list of articles", function(assert) {
  let articles = server.createList('article', 3);

  visit('/latest');

  andThen(() => {
    assert.equal(find('article').length, articles.length);
    assert.equal(find('article:first .t-title').text().trim(), articles[0].title);
    assert.equal(find('article:first .t-text').text().trim(), articles[0].text);
    assert.equal(find('article:first img').attr('src'), articles[0].urlToImage);
  });
});

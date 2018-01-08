import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | latest news');

test("I can view the list of articles", async function(assert) {
  let articles = server.createList('post', 3);

  await visit('/latest');

  assert.equal(find('article').length, articles.length);
  assert.equal(find('article:first .t-title').text().trim(), articles[0].title);
  assert.equal(find('article:first .t-truncated-text').text().trim(), articles[0].text.substring(0, 200).trim());
  pauseTest();
  assert.equal(find('article:first img').attr('src'), articles[0].thread.mainImage);
});

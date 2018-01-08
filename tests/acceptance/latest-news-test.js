import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';
import page from '../pages/latest-news';

moduleForAcceptance('Acceptance | latest news');

test("I can view the list of articles", async function(assert) {
  let articles = server.createList('post', 3);

  await page.visit();

  assert.equal(page.articles().count, articles.length);
  assert.equal(page.articles(0).title, articles[0].title);
  assert.equal(page.articles(0).truncatedText, articles[0].text.substring(0, 200).trim());
  assert.equal(page.articles(0).imageUrl, articles[0].thread.mainImage);
});

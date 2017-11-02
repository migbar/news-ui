import { moduleForComponent, test } from 'ember-qunit';
import { click } from 'ember-native-dom-helpers';
import { startMirage } from 'news-ui/initializers/ember-cli-mirage';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article-tile', 'Integration | Component | article tile', {
  integration: true,
  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders the article tile without the expand button if article has a short text', function(assert) {
  assert.expect(5);
  let article = server.create('post');
  article.text = "This is a short text.";

  this.set('article', article)
  this.render(hbs`{{article-tile article=article}}`);

  assert.equal(this.$('.t-title').text().trim(), article.title);
  assert.equal(this.$('.t-author').text().trim(), `By ${article.author}`);
  assert.equal(this.$('.t-text').text().trim(), `${article.text}`);
  assert.equal(this.$('.t-toggle-text').length, 0);
  assert.equal(this.$('img').attr('src'), article.thread.mainImage);
});


test('it renders the article tile with the expand button and the truncated text if article has a long text', function(assert) {
  assert.expect(5);

  let article = server.create('post');
  article.text = `Sunt ex qui. Exercitationem omnis laudantium magnam sit.
  Ad totam esse et sed earum ut. Dolorum nesciunt est illo non possimus magnam tempore cupiditate placeat.
  Dolorem dignissimos iusto temporibus. In quidem velit provident nulla. Nihil est eos deleniti sed est ea.
  Accusantium praesentium sapiente consequatur est.
  Vero odit doloremque quam reprehenderit minima voluptas aspernatur magni possimus.
  Soluta illum et culpa expedita at dolorem laboriosam.`

  this.set('article', article)
  this.render(hbs`{{article-tile article=article}}`);

  assert.equal(this.$('.t-title').text().trim(), article.title);
  assert.equal(this.$('.t-author').text().trim(), `By ${article.author}`);
  assert.equal(this.$('.t-truncated-text').text().trim(), `${article.text}`.substring(0,200));
  assert.equal(this.$('.t-toggle-text').length, 1);
  assert.equal(this.$('img').attr('src'), article.thread.mainImage);
});

test('clicking the expand button revveals the whole text', async function(assert) {
  assert.expect(4);

  let article = server.create('post');
  article.text = `Sunt ex qui. Exercitationem omnis laudantium magnam sit.
  Ad totam esse et sed earum ut. Dolorum nesciunt est illo non possimus magnam tempore cupiditate placeat.
  Dolorem dignissimos iusto temporibus. In quidem velit provident nulla. Nihil est eos deleniti sed est ea.
  Accusantium praesentium sapiente consequatur est.
  Vero odit doloremque quam reprehenderit minima voluptas aspernatur magni possimus.
  Soluta illum et culpa expedita at dolorem laboriosam.`

  this.set('article', article)
  this.render(hbs`{{article-tile article=article}}`);
  assert.equal(this.$('.t-truncated-text').text().trim(), `${article.text}`.substring(0, 200));
  assert.equal(this.$('.t-text').length, 0);

  await click('.t-toggle-text');

  assert.equal(this.$('.t-text').text().trim(), `${article.text}`);
  assert.equal(this.$('.t-truncated-text').length, 0);
});

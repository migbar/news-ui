import { moduleForComponent, test } from 'ember-qunit';
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

test('it renders', function(assert) {
  let post = server.create('post');

  this.set('article', post)
  this.render(hbs`{{article-tile article=article}}`);

  assert.equal(this.$('.t-title').text().trim(), post.title);
  assert.equal(this.$('.t-author').text().trim(), `By ${post.author}`);
  assert.equal(this.$('.t-text').text().trim(), post.text);
  assert.equal(this.$('img').attr('src'), post.thread.mainImage);
});

import { moduleForComponent, test } from 'ember-qunit';
import { startMirage } from 'news-ui/initializers/ember-cli-mirage';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('article-list', 'Integration | Component | article list', {
  integration: true,

  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders the list of articles passed in', function(assert) {
  let articles = server.createList('post', 3);
  this.set('articles', articles);

  this.render(hbs`{{article-list articles=articles}}`);

  assert.equal(this.$('article').length, articles.length);
});

test('it shows a message if no articles are available', function(assert) {
  this.set('articles', []);

  this.render(hbs`{{article-list articles=articles}}`);

  assert.equal(this.$().text().trim(), 'No Articles found');
});

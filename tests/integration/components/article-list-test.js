import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'news-ui/initializers/ember-cli-mirage';

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
  // Handle any actions with this.on('myAction', function(val) { ... });
  let articles = server.createList('article', 3);
  this.set('articles', articles);

  this.render(hbs`{{article-list articles=articles}}`);

  assert.equal(this.$('article').length, articles.length);
  assert.equal(this.$('article:first .t-title').text().trim(), articles[0].title);
  assert.equal(this.$('article:first .t-description').text().trim(), articles[0].description);
  assert.equal(this.$('article:first img').attr('src'), articles[0].urlToImage);

});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { startMirage } from 'news-ui/initializers/ember-cli-mirage';

moduleForComponent('source-list', 'Integration | Component | source list', {
  integration: true,

  beforeEach() {
    this.server = startMirage();
  },
  afterEach() {
    this.server.shutdown();
  }
});

test('it renders the list of sources passed in', function(assert) {
  let sources = server.createList('source', 3);
  this.set('sources', sources);

  this.render(hbs`{{source-list sources=sources}}`);

  assert.equal(this.$('article').length, sources.length);
  assert.equal(this.$('article:first .t-name').text().trim(), sources[0].name);
  assert.equal(this.$('article:first .t-description').text().trim(), sources[0].description);
  assert.equal(this.$('article:first .t-category').text().trim(), sources[0].category);
  assert.equal(this.$('article:first .t-country').text().trim(), sources[0].country);
  assert.equal(this.$('article:first .t-language').text().trim(), sources[0].language);

  assert.equal(this.$('article:first img').attr('src'), `https://icons.better-idea.org/icon?url=${sources[0].url}&size=96`);

});

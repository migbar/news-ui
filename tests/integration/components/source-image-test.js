import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('source-image', 'Integration | Component | source image', {
  integration: true
});

test('it renders an image from the icons better-idea with the default size if not passed in', function(assert) {
  let url = "http://foo.com"
  let name = "some name"
  this.set('url', url);
  this.set('name', name);

  this.render(hbs`{{source-image url=url name=name}}`);

  assert.equal(this.$('img').length, 1);
  assert.equal(this.$('img').attr('src'), `https://icons.better-idea.org/icon?url=${url}&size=64`);
  assert.equal(this.$('img').attr('alt'), `${name} logo`);
});


test('it renders an image of the size passed in', function(assert) {
  let url = "http://foo.com"
  this.set('url', url);
  this.set('name', "name1");

  this.render(hbs`{{source-image url=url name=name size='small'}}`);
  assert.equal(this.$('img').attr('src'), `https://icons.better-idea.org/icon?url=${url}&size=32`);

  this.render(hbs`{{source-image url=url name=name size='medium'}}`);
  assert.equal(this.$('img').attr('src'), `https://icons.better-idea.org/icon?url=${url}&size=64`);

  this.render(hbs`{{source-image url=url name=name size='large'}}`);
  assert.equal(this.$('img').attr('src'), `https://icons.better-idea.org/icon?url=${url}&size=96`);
});

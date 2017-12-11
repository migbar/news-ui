import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('draft-indicator', 'Unit | Component | draft indicator', {
  unit: true
});

test('it knows it is not a draft if book and data have same fields', function(assert) {
  let component = this.subject();

  component.set('book', { title: 'title one', description: 'description one' });
  component.set('data', { title: 'title one', description: 'description one' });

  assert.ok(!component.get('isDraft'));
});

test('it knows it is a draft if book and data have different title', function(assert) {
  let component = this.subject();

  component.set('book', { title: 'title one', description: 'description one' });
  component.set('data', { title: 'different', description: 'description one' });

  assert.ok(component.get('isDraft'));
});

test('it knows it is a draft if book and data have different description', function(assert) {
  let component = this.subject();

  component.set('book', { title: 'title one', description: 'description one' });
  component.set('data', { title: 'title one', description: 'different' });

  assert.ok(component.get('isDraft'));
});

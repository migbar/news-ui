import { moduleFor, test } from 'ember-qunit';
import ENV from "news-ui/config/environment";

moduleFor('adapter:source', 'Unit | Adapter | source', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let adapter = this.subject();
  assert.equal(adapter.get('host'), ENV.APP.Host);
  assert.equal(adapter.get('namespace'), 'api/v1');
});

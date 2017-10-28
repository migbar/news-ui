import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  embed: true,

  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
});

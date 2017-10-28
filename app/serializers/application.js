import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'uuid',

  keyForAttribute(attr) {
    return Ember.String.underscore(attr);
  }
  
});

import { underscore } from '@ember/string';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: 'uuid',

  keyForAttribute(attr) {
    return underscore(attr);
  }

});

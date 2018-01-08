import { underscore } from '@ember/string';
import { RestSerializer } from 'ember-cli-mirage';

export default RestSerializer.extend({
  embed: true,

  keyForAttribute(attr) {
    return underscore(attr);
  }
});

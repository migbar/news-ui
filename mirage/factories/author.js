import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  uuid(i) {
    return i + 1;
  },

  name() {
    return faker.name.findName();
  }

});

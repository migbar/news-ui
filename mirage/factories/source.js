import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  name(i) {
    return `Source ${i}`;
  },

  description(i) {
    return `Description ${i}`;
  },

  category(i) {
    return `Category ${i}`;
  },

  url() {
    return faker.internet.url();
  },

  language(i) {
    return `language ${i}`;
  },

  country(i) {
    return `country ${i}`;
  }

});

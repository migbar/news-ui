import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  title(i) {
    return `Title ${i}`;
  },

  author(i) {
    return `Author ${i}`;
  },

  description(i) {
    return `Description ${i}`;
  },

  url() {
    return faker.internet.url();
  },

  urlToImage() {
    return faker.image.imageUrl();
  }

});

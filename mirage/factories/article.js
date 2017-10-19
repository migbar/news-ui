import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  title(i) {
    return `Title ${i}`;
  },

  author(i) {
    return `Author ${i}`;
  },

  text(i) {
    return `Text ${i}`;
  },

  url() {
    return faker.internet.url();
  },

  urlToImage() {
    return faker.image.imageUrl();
  }

});

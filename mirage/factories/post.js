import { Factory, faker, association } from 'ember-cli-mirage';

/**
  Still outstanding:

  highlightText: attr('string'),
  highlightTitle: attr('string'),
  externalLinks: attr('string'),

**/

export default Factory.extend({
  thread: association(),

  uuid() {
    return  faker.random.uuid();
  },

  url() {
    return faker.internet.url();
  },

  author(i) {
    return faker.name.findName();
  },

  text(i) {
    return faker.lorem.sentences(10);
  },

  title(i) {
    return faker.lorem.sentence();
  },

  ordInThread() {
    return 1;
  },

  language() {
    return 'english';
  },

  published() {
    return '2017-10-25T23:50:00.000+03:00';
  },

  crawled() {
    return '2017-10-26T00:12:52.000+03:00';
  },

  rating() {
    return 4.5;
  }
});

import { Factory, faker, association, trait } from 'ember-cli-mirage';

/**
  Still outstanding:

  highlightText: attr('string'),
  highlightTitle: attr('string'),
  externalLinks: attr('string'),

**/

const AUTHORS = [
  "James Joyce",
  "Scott Fitzgerald",
  "James Joyce",
  "Vladimir Nabokov",
  "Aldous Huxley",
  "William Faulkner",
  "Joseph Heller",
  "Arthur Koestler",
  "D.H. Lawrence",
  "John Steinbeck"
]

export default Factory.extend({
  thread: association(),

  uuid() {
    return faker.random.uuid();
  },

  url() {
    return faker.internet.url();
  },

  author() {
    return AUTHORS[Math.floor(Math.random() * AUTHORS.length)];
  },

  text() {
    return faker.lorem.sentences(10);
  },

  title() {
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
  },

  // traits
  long: trait({
    text: faker.lorem.sentences(30)
  }),

  short: trait({
    text: faker.lorem.sentences(3)
  })

});
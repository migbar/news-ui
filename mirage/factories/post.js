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
],

LANGUAGES = [
  "English",
  "French",
  "Spanish",
  "German",
  "Hebrew",
  "Japanese",
  "Finish"
]

export default Factory.extend({
  thread: association(),

  uuid(i) {
    return `post-${i+1}`;
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
    return LANGUAGES[Math.floor(Math.random() * LANGUAGES.length)];
  },

  published() {
    return '2017-10-25T23:50:00.000+03:00';
  },

  crawled() {
    return '2017-10-26T00:12:52.000+03:00';
  },

  rating() {
    return Math.floor(Math.random() * 5) + 1;
  },

  // traits
  long: trait({
    text: faker.lorem.sentences(30)
  }),

  short: trait({
    text: faker.lorem.sentences(3)
  })

});

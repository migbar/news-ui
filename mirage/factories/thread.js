import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  uuid() {
    return  faker.random.uuid();
  },

  url() {
    return faker.internet.url();
  },

  siteFull() {
    return faker.internet.domainName();
  },

  site() {
    return faker.internet.domainName();
  },

  siteSection() {
    return faker.internet.url();
  },

  sectionTitle() {
    return faker.lorem.sentence();
  },

  title() {
    return faker.lorem.sentence();
  },

  titleFull() {
    return faker.lorem.sentences(2);
  },

  published() {
    return '2017-10-25T23:50:00.000+03:00';
  },

  siteType(i) {
    let idx = faker.random.number(2)
    return ['blog', 'news', 'forum'][idx];
  },

  country(i) {
    return faker.address.country();
  },

  mainImage() {
    return faker.image.imageUrl();
  },

  spamScore() {
    return faker.random.number(10);
  },

  repliesCount() {
    return faker.random.number(10);
  },

  participantsCount() {
    return faker.random.number(10);
  },

  performanceScore() {
    return faker.random.number(10);
  },

  domainRank() {
    return faker.random.number(10);
  }

});

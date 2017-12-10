import { Factory, faker } from 'ember-cli-mirage';


const CATEGORIES = [
  "Suspense",
  "Comedy",
  "Poetry",
  "Programming",
  "Politics",
  "Cooking"
];

export default Factory.extend({

  uuid(i) {
    return i + 1;
  },

  title: function() {
    return faker.lorem.sentence();
  },

  description: function() {
    return faker.lorem.sentence(10);
  },

  publishedOn: function() {
    return new Date();
  },

  category: function() {
    return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  },

  // author: DS.belongsTo('author')

});

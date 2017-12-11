import DS from 'ember-data';
const { attr } = DS;

export default DS.Model.extend({
  title: attr('string'),
  description: attr('string'),
  publishedOn: attr('date'),
  category: attr('string')
  // author: belongsTo('author')
});

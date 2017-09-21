import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  url: DS.attr('string'),
  category: DS.attr('string'),
  language: DS.attr('string'),
  country: DS.attr('string')
});

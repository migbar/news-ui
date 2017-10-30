import Ember from 'ember';
const { computed: { alias } } = Ember;

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['bb b--black-05'],
  mainImage: alias('article.thread.mainImage')
});

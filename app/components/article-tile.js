import Ember from 'ember';
const { computed, inject } = Ember;

export default Ember.Component.extend({
  imageGenerator: inject.service('image-url-generator'),
  tagName: 'article',
  classNames: ['bb b--black-05'],
  mainImage: computed('article.mainImage', function() {
    return this.get('imageGenerator').nextUrl();
  })
});

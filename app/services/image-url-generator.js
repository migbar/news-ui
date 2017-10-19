import Ember from 'ember';

const endpoint = 'http://lorempixel.com';
const size = '400/400';
const categories = [
  'abstract', 'animals', 'business', 'cats', 
  'city', 'food', 'nightlife', 'fashion', 'people', 
  'nature', 'sports', 'technics', 'transport'
];

var idx = 0;

export default Ember.Service.extend({
  indices: [],

  init() {
    this._super(...arguments);
    this.initIndices();
  },

  initIndices() {
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < categories.length; j++) {
        this.get('indices').pushObject({
          category: categories[j],
          index: i
        });
      }
    }
  },

  nextUrl() {
    let currentIndex = this.getCurrentIndex();
    return `${endpoint}/${size}/${currentIndex['category']}/${currentIndex['index']}`;
  },

  getCurrentIndex() {
    let indices = this.get('indices');
    let current = indices[idx];
    idx >= indices.length - 1 ? idx = 0: idx++;
    
    return current;
  }
});

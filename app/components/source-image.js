import Ember from 'ember';

const ICON_SERVICE_URL = "https://icons.better-idea.org/icon";
const SIZES = {
  'SMALL': 32,
  'MEDIUM': 64,
  'LARGE': 96
};

export default Ember.Component.extend({

  src: Ember.computed('url', function() {
    return `${ICON_SERVICE_URL}?url=${this.get('url')}&size=${this.imageSize()}`
  }),

  alt: Ember.computed('name', function() {
    return `${this.get('name')} logo`;
  }),

  imageSize() {
    let s = this.get('size') || 'MEDIUM';
    return SIZES[s.trim().toUpperCase()];
  }
});

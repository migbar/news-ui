import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

const ARTICLE_MAX_DISPLAY_LENGTH = 200;

export default Component.extend({
  tagName: 'article',
  classNames: ['bb b--black-05'],
  mainImage: alias('article.thread.mainImage'),

  showAll: false,

  expandable: computed('article.text', function() {
    return this.get('article.text').length >= ARTICLE_MAX_DISPLAY_LENGTH;
  }),

  truncatedText: computed('article.text', function() {
    return this.get('article.text').substring(0, ARTICLE_MAX_DISPLAY_LENGTH);
  }),

  toggleText() {
    this.toggleProperty('showAll');
  }

});

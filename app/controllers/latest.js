import Ember from 'ember';
import { task, timeout, restartable } from 'ember-concurrency';
import groupBy from 'ember-group-by';

const { computed } = Ember;
const DEBOUNCE_MS = 500;

export default Ember.Controller.extend({
  // queryParams: ['search'],
  // search: '',

  queryParams: [ 'selectedAuthor', 'selectedLanguage', 'selectedRating' ],

  selectedAuthor: null,
  selectedLanguage: null,
  selectedRating: null,
  isLoading: computed.readOnly('model.loadTask.isRunning'),

  _latest: [],

  latest: computed('model.loadTask.{isRunning,value}', '_latest', function() {
    if (this.get('isLoading')) {
      return this.get('_latest');
    } else {
      return this.get('model.loadTask.value');
    }
  }),

  articles: computed('latest.[]', 'selectedAuthor', 'selectedLanguage', 'selectedRating', function() {
    let selectedAuthor = this.get('selectedAuthor');
    let selectedLanguage = this.get('selectedLanguage');
    let selectedRating = this.get('selectedRating');
    return this.get('latest')
      .filter(article => selectedAuthor ? article.get('author') === selectedAuthor : true)
      .filter(article => selectedLanguage ? article.get('language') === selectedLanguage : true)
      .filter(article => selectedRating ? article.get('id') === selectedRating : true);
  }),

  latestByAuthor: groupBy('articles', 'author'),
  authorData: computed('latestByAuthor.[]', function() {
    let groups = this.get('latestByAuthor');
    return groups.map(group => {
      return {
        label: group.value,
        value: group.items.length
      }
    });
  }),

  latestByLanguage: groupBy('articles', 'language'),
  languageData: computed('latestByLanguage.[]', function() {
    let groups = this.get('latestByLanguage');
    return groups.map(group => {
      return {
        label: group.value,
        value: group.items.length
      }
    });
  }),

  ratingsData: computed('articles.[]', function() {
    return this.get('articles').map(post => {
      return {
        label: post.id,
        value: post.get('rating')
      }
    })
  }),

  updateSearch: task(function*(term) {
    yield timeout(DEBOUNCE_MS);

    this.set('search', term);
  }).restartable(),

  actions: {
    toggleBar(property, label) {
      let newValue = this.get(property) === label ? null : label;
      this.set(property, newValue);
    }
  }
});

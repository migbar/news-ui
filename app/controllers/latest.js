import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import groupBy from 'ember-group-by';

const DEBOUNCE_MS = 500;

export default Controller.extend({
  // queryParams: ['search'],
  // search: '',

  queryParams: [ 'selectedAuthor', 'selectedLanguage', 'selectedRating' ],

  selectedAuthor: null,
  selectedLanguage: null,
  selectedRating: null,
  isLoading: computed.readOnly('model.loadTask.isRunning'),

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
      .filter(article => selectedRating ? article.get('rating') === ''+selectedRating : true);
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

  latestByRating: groupBy('articles', 'rating'),
  ratingsData: computed('latestByRating.[]', function() {
    let groups = this.get('latestByRating');
    let result = [];
    for (var i = 0; i < 10; i++) {
      result[i] = { label: i, value: 0 };
    }
    groups.forEach((group) => {
      result[group.value]['value'] = group.items.length;
    });
    return result;
  }),

  updateSearch: task(function*(term) {
    yield timeout(DEBOUNCE_MS);

    this.set('search', term);
  }).restartable(),

  init() {
    this._super(...arguments);
    this._latest = [];
  },
  
  actions: {
    toggleBar(property, label) {
      let newValue = this.get(property) === label ? null : label;
      this.set(property, newValue);
    }
  }
});

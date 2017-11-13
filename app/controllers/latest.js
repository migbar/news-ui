import Ember from 'ember';
import { task, timeout, restartable } from 'ember-concurrency';

const { computed } = Ember;
const DEBOUNCE_MS = 500;

export default Ember.Controller.extend({
  queryParams: ['search'],
  search: '',

  isLoading: computed.readOnly('model.loadTask.isRunning'),

  _latest: [],
  latest: computed('model.loadTask.{isRunning,value}', '_latest', function() {
    if (this.get('isLoading')) {
      return this.get('_latest');
    } else {
      return this.get('model.loadTask.value');
    }
  }),

  updateSearch: task(function * (term) {
    yield timeout(DEBOUNCE_MS);

    this.set('search', term);
  }).restartable()

})

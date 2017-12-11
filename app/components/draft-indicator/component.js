import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

export default Ember.Component.extend({
  tagName: 'span',

  data: stateFor('book-state', 'book'),

  isDraft: Ember.computed('data.somethingChanged', 'data.title', 'data.description', function() {
    let titleChanged = this.get('book.title') !== this.get('data.title');
    let descriptionChanged = this.get('book.description') !== this.get('data.description');

    return titleChanged || descriptionChanged;
  })
});

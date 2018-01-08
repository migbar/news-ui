import Component from '@ember/component';
import { computed } from '@ember/object';
import stateFor from 'ember-state-services/state-for';

export default Component.extend({
  tagName: 'span',

  data: stateFor('book-state', 'book'),

  isDraft: computed('data.{somethingChanged,title,description}', function() {
    let titleChanged = this.get('book.title') !== this.get('data.title');
    let descriptionChanged = this.get('book.description') !== this.get('data.description');

    return titleChanged || descriptionChanged;
  })
});

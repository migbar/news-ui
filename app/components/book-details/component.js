import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

export default Ember.Component.extend({

  data: stateFor('book-state', 'book'),

  actions: {

    commit() {
      let title = this.get('data.title');
      let description = this.get('data.description');
      let book = this.get('book');

      let props = { title, description };

      this.get('on-update')(book, props)
        .then(() => {
          this.toggleProperty('data.somethingChanged');
        });
    }
  }
});

import Ember from 'ember';
import stateFor from 'ember-state-services/state-for';

export default Ember.Controller.extend({
  authorState: stateFor('author-state', 'editingAuthor'),

  isEditing: false,

  actions: {

    editAuthor(author) {
      this.set('editingAuthor', author);
      if (!this.get('authorState.name')) {
        this.set('authorState.name', author.get('name'))
      }
      this.set('isEditing', true);
    },

    cancelEdit() {
      this.set('editingAuthor', null);
      this.set('isEditing', false);
    },

    commitChange() {
      this.set('editingAuthor.name', this.get('authorState.name'));
      this.set('editingAuthor', null);
      this.set('isEditing', false);
    }

  }

})

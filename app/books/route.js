import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.findAll('book');
  },

  actions: {
    updateBook(book, props) {
      book.setProperties(props);      
      return book.save();
    }
  }
});

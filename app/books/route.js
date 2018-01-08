import Route from '@ember/routing/route';

export default Route.extend({
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

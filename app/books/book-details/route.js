import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.find('book', params['book_id']);
  }
});

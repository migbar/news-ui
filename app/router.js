import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('latest');
  this.route('dashboard');
  this.route('books', function() {
    this.route('book-details', { path: '/:book_id' });
  });
  // this.route('books', { path: '/books/:status' }, function() {
  //   this.route('book-details',  { path: '/:book-id' } );
  // });

  this.route('authors');
});

export default Router;

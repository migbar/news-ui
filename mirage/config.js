export default function() {
  this.urlPrefix = 'http://localhost:4000';
  this.namespace = 'api/v1';

  this.get('/articles');
  this.get('/articles/:id');
}

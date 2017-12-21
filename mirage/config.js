export default function() {
  this.urlPrefix = 'http://webhose.io';
  this.passthrough('https://api.blockcypher.com/**');
  this.passthrough('https://api.coindesk.com/**');

  this.get('/filterWebContent', 'posts');

  this.get('/books');
  this.get('/books/:id');
  this.put('/books/:id');

  this.get('/authors');
}
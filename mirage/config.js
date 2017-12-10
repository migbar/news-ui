export default function() {

  this.urlPrefix = 'http://webhose.io';

  this.get('/filterWebContent', schema => {
    return schema.posts.all();
  });

  this.get('/books', schema => {
    return schema.books.all();
  });

  this.get('/authors', schema => {
    return schema.authors.all();
  });

}

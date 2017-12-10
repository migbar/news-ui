export default function() {

  this.urlPrefix = 'http://webhose.io';

  this.get('/filterWebContent', schema => {
    return schema.posts.all();
  });

  this.get('/books', schema => {
    console.log('in books');
    return schema.books.all();
  });

}


export default function() {
  this.urlPrefix = 'http://webhose.io';

  this.get('/filterWebContent', (schema) => {
    return schema.posts.all();
  });

}

export default function(server) {
  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */
  server.createList('post', 30, 'long');
  server.createList('book', 10);
  server.createList('author', 10);
}

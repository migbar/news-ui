import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | books index');

test('visiting books route renders the list of books', async function(assert) {
  let books = server.createList('book', 5);

  await visit('/books');

  books.forEach((book, index) => {
    assert.equal(find(`[data-test-title=${index}]`).text().trim(), book.title);
    assert.equal(find(`[data-test-description=${index}]`).text().trim(), book.description);
  });
});

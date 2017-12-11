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

test('typing a new title and description just marks the book as draft', async function(assert) {
  let books = server.createList('book', 5);

  await visit('/books');
  await click(find(`[data-test-book=0] a`));
  assert.equal(find(`[data-test-book=0] .draft-indicator`).length, 0);

  assert.equal(currentURL(), '/books/1');
  await fillIn(find('[data-test-title-input]'), 'new title');
  await fillIn(find('[data-test-description-input]'), 'new description');

  assert.equal(find(`[data-test-book=0] .draft-indicator`).length, 1);
  assert.equal(find(`.draft-indicator`).length, 1);

  books.forEach((book, index) => {
    assert.equal(find(`[data-test-title=${index}]`).text().trim(), book.title);
    assert.equal(find(`[data-test-description=${index}]`).text().trim(), book.description);
  });
});

test('switching away from editing one book to another marks both as draft', async function(assert) {
  server.createList('book', 5);

  await visit('/books');
  await click(find(`[data-test-book=0] a`));
  await fillIn(find('[data-test-title-input]'), 'new title 0');
  await fillIn(find('[data-test-description-input]'), 'new description 0');

  await click(find(`[data-test-book=1] a`));
  await fillIn(find('[data-test-title-input]'), 'new title 1');
  await fillIn(find('[data-test-description-input]'), 'new description 1');

  assert.equal(find(`.draft-indicator`).length, 2);
});

test('commiting one book change removes its draft indicator and changes just that book on the list', async function(assert) {
  let books = server.createList('book', 5);

  let newTitle = 'new title 0';
  let newDescription = 'new Description 0';

  await visit('/books');
  await click(find(`[data-test-book=0] a`));
  await fillIn(find('[data-test-title-input]'), newTitle);
  await fillIn(find('[data-test-description-input]'), newDescription);

  await click(find(`[data-test-book-ok-button]`));

  assert.equal(find(`.draft-indicator`).length, 0);
  assert.equal(find(`[data-test-title=0]`).text().trim(), newTitle);
  assert.equal(find(`[data-test-description=0]`).text().trim(), newDescription);

  books.slice(1).forEach((book, index) => {
    assert.equal(find(`[data-test-title=${index+1}]`).text().trim(), book.title);
    assert.equal(find(`[data-test-description=${index+1}]`).text().trim(), book.description);
  });
});

test('switching away from editing one book and coming back, remembers its draft state ', async function(assert) {
  let books = server.createList('book', 5);
  let newTitle = 'new title 0';
  let newDescription = 'new description 0';

  await visit('/books');

  await click(find(`[data-test-book=0] a`));
  assert.equal(find('[data-test-title-input]').val().trim(), books[0].title);
  assert.equal(find('[data-test-description-input]').val().trim(), books[0].description);

  await fillIn(find('[data-test-title-input]'), newTitle);
  await fillIn(find('[data-test-description-input]'), newDescription);

  await click(find(`[data-test-book=1] a`));
  assert.equal(find('[data-test-title-input]').val().trim(), books[1].title);
  assert.equal(find('[data-test-description-input]').val().trim(), books[1].description);

  await click(find(`[data-test-book=0] a`));
  assert.equal(find('[data-test-title-input]').val().trim(), newTitle);
  assert.equal(find('[data-test-description-input]').val().trim(), newDescription);
});

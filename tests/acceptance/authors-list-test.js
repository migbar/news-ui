import { test } from 'qunit';
import moduleForAcceptance from 'news-ui/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | authors list');

test('visiting /authors renders the list of authors', async function(assert) {
  let authors = server.createList('author', 5);

  await visit('/authors');

  authors.map((author, index) => {
    assert.equal(find(`[data-test-author-name=${index}]`).text().trim(), author.name);
  });
});

test('clicking the edit pencil brings the edit author dialog', async function(assert) {
  let authors = server.createList('author', 5);

  await visit('/authors');
  await click(find(`[data-test-autor-edit-button=0]`));

  assert.equal(find('.ember-modal-dialog h2').text().trim(), 'Edit Author');
  assert.equal(find('.ember-modal-dialog input').val().trim(), authors[0].name);
});

test('typing and cancelling the edit dialog does not bleed out to the list', async function(assert) {
  let authors = server.createList('author', 5);

  await visit('/authors');
  await click(find(`[data-test-autor-edit-button=0]`));

  await fillIn('.ember-modal-dialog input', 'new name');
  await click(find('[data-test-cancel-button]'));

  authors.map((author, index) => {
    assert.equal(find(`[data-test-author-name=${index}]`).text().trim(), author.name);
  });

});

test('typing and confirming the edit dialog updates the list', async function(assert) {
  let authors = server.createList('author', 5);
  let newName = "New Name";

  await visit('/authors');
  await click(find(`[data-test-autor-edit-button=0]`));

  await fillIn('.ember-modal-dialog input', newName);
  await click(find('[data-test-ok-button]'));

  // assert that the first author was changed
  assert.equal(find(`[data-test-author-name=0]`).text().trim(), newName);

  // assert that the rest of the authors were not changed
  authors.slice(1).map((author, index) => {
    assert.equal(find(`[data-test-author-name=${index+1}]`).text().trim(), author.name);
  });

});

test('typing, cancelling and reopening the same author for edit remembers the edit as it was left', async function(assert) {
  server.createList('author', 5);

  let newName = 'New Name';

  await visit('/authors');
  await click(find(`[data-test-autor-edit-button=0]`));

  await fillIn('.ember-modal-dialog input', newName);
  await click(find('[data-test-cancel-button]'));

  await click(find(`[data-test-autor-edit-button=0]`));
  assert.equal(find('.ember-modal-dialog input').val().trim(), newName);
});


test('each abandoned edit is still attached to its author', async function(assert) {
  server.createList('author', 5);

  let newName0 = 'New Name 0';
  let newName1 = 'New Name 1';

  await visit('/authors');

  //edit and cancel author 0
  await click(find(`[data-test-autor-edit-button=0]`));
  await fillIn('.ember-modal-dialog input', newName0);
  await click(find('[data-test-cancel-button]'));

  //edit and cancel author 1
  await click(find(`[data-test-autor-edit-button=1]`));
  await fillIn('.ember-modal-dialog input', newName1);
  await click(find('[data-test-cancel-button]'));

  //go back to author 0 and see that its edit is still there
  await click(find(`[data-test-autor-edit-button=0]`));
  assert.equal(find('.ember-modal-dialog input').val().trim(), newName0);
  await click(find('[data-test-cancel-button]'));

  //go back to author 1 and see that its edit is still there
  await click(find(`[data-test-autor-edit-button=1]`));
  assert.equal(find('.ember-modal-dialog input').val().trim(), newName1);
});

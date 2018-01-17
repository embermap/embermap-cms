import { test } from 'qunit';
import moduleForAcceptance from 'embermap-cms/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | Posts test');

test('I can see the posts', async function(assert) {
  server.createList('post', 3);

  visit('/posts');

  andThen(function() {
    assert.equal(find('tbody tr').length, 3);
  });
});

test('If the index route errors, I see a message', async function(assert) {
  server.create('post');
  server.get("/posts/:id", { errors: ['The site is down'] }, 500); // force Mirage to error

  await assert.asyncThrows(() => {
    return visit("/posts/1");
  }, 'GET /posts/1 returned a 500');

  assert.ok(find(":contains(The site is down)").length > 1);
});

test('I can edit a post', async function(assert) {
  server.create('post', { text: 'Old post body' });

  await visit('/posts/1/edit');
  await fillIn('textarea', 'New post body');
  await click('button:contains(Save)');

  assert.equal(currentURL(), '/posts/1');
  assert.ok(find(':contains(New post body)').length > 0);
});

test('if editing a post errors, I see a message', async function(assert) {
  server.create('post', { text: 'Old post body' });
  server.patch('/posts/:id', { errors: [ 'A bad thing happened' ] }, 500);

  await visit('/posts/1/edit');
  await fillIn('textarea', 'New post body');

  await assert.asyncThrows(() => {
    return click('button:contains(Save)');
  }, 'PATCH /posts/1 returned a 500');

  assert.ok(find(':contains(Whoops - your post was not saved)').length > 0, 'I see the message');
});

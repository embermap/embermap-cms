import { test } from 'qunit';
import moduleForAcceptance from 'embermap-cms/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | posts');

test('I can view the index of posts', async function(assert) {
  server.createList('post', 3);

  await visit('/posts');

  assert.equal(find('tbody tr').length, 3);
});

test("If there's a problem loading the posts, I see an error message", async function(assert) {
  server.createList('post', 3);
  server.get('/posts', { errors: [ 'The database is on vacation' ] }, 500);

  await assert.asyncThrows(() => {
    return visit('/posts');
  }, 'GET /posts returned a 500');

  assert.ok(find(':contains(The database is on vacation)').length > 0)
});

test('I can edit a blog post', async function(assert) {
  let post = server.create('post', { title: 'Old post title' });

  await visit('/posts/1/edit');
  await fillIn('input', 'New post title');
  await click('button:contains(Save)');

  post.reload();
  assert.equal(currentURL(), '/posts/1');
  assert.ok(find(':contains(New post title)').length > 0)
  assert.equal(post.title, 'New post title');
});

test('If editing a post fails, I see an error message', async function(assert) {
  server.create('post', { title: 'Old post title' });
  server.patch('/posts/:id', { errors: [ ] }, 500);

  await visit('/posts/1/edit');
  await fillIn('input', 'New post title');

  await assert.asyncThrows(() => {
    return click('button:contains(Save)');
  }, 'PATCH /posts/1 returned a 500');

  assert.ok(find(':contains(Whoops - your post was not saved)').length > 0)
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | comment-box', function(hooks) {
  setupRenderingTest(hooks);

  test('it can render a comment', async function(assert) {
    this.comment = {
      text: 'hello world',
      author: 'Ryan'
    };

    await render(hbs`{{comment-box comment=comment}}`);

    assert.dom('[data-test-id="text"]').hasText('hello world');
    assert.dom('[data-test-id="author"]').includesText('Ryan');

  });

  test('it can render a long comment', async function(assert) {
    this.comment = {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Ryan'
    };

    await render(hbs`{{comment-box comment=comment}}`);

    // long comments are truncated
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...');
    assert.dom('[data-test-id="author"]').includesText('Ryan');

    // truncated comments can be expanded
    await click('[data-test-id="show-more"]');
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    // expanded comments can be collasped
    await click('[data-test-id="show-less"]');
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...');
  });
});

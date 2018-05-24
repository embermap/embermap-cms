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

  test('long comments start out truncated', async function(assert) {
    // Assemble
    this.comment = {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Ryan'
    };

    // Act
    await render(hbs`{{comment-box comment=comment}}`);

    // Assert
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...');
    assert.dom('[data-test-id="author"]').includesText('Ryan');
  });

  test('truncated commands can be expanded', async function(assert) {
    // Given
    this.comment = {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Ryan'
    };
    await render(hbs`{{comment-box comment=comment}}`);

    // When
    await click('[data-test-id="show-more"]');

    // Then
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
  });

  test('expanded comments can be collasped', async function(assert) {
    // Assemble
    this.comment = {
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      author: 'Ryan'
    };
    await render(hbs`{{comment-box comment=comment}}`);
    await click('[data-test-id="show-more"]');

    // Act
    await click('[data-test-id="show-less"]');

    // Assert
    assert.dom('[data-test-id="text"]').hasText('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,...');
  });
});

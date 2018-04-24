import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
});

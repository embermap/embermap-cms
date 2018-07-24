import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | network-status', function(hooks) {
  setupRenderingTest(hooks);

  test('it makes sure we are online', async function(assert) {
    await render(hbs`
      {{#network-status as |status|}}
        {{if status.isOnline 'online' 'offline'}}
      {{/network-status}}
    `);

    assert.equal(this.element.textContent.trim(), 'online');
  });
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | ui-button', function(hooks) {
  setupRenderingTest(hooks);

  test('a button can fire an action', async function(assert) {
    let myAction = function() {
      assert.step('button clicked');
    };
    this.set('myAction', myAction);

    await render(hbs`{{#ui-button onClick=(action myAction)}}my button{{/ui-button}}`);
    await click('button');

    assert.verifySteps(['button clicked']);
  });

  test('a button does not fire when disabled', async function(assert) {
    let myAction = function() {
      assert.step('button clicked');
    };
    this.set('myAction', myAction);

    await render(hbs`{{#ui-button onClick=(action myAction) disabled=true}}my button{{/ui-button}}`);
    await click('button');

    assert.verifySteps([]);
  });

});

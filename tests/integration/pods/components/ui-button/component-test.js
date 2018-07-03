import { module, test } from 'qunit';
import TaskHelper from 'embermap-cms/tests/helpers/task-helper';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, waitFor } from '@ember/test-helpers';
import { task, timeout } from 'ember-concurrency';
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

  test('a button can perform a task', async function(assert) {
    let myTask = task(function*() {
      assert.step('button clicked');
      yield timeout(10);
    });
    this.set('myTask', myTask);

    await render(hbs`{{#ui-button task=myTask}}my button{{/ui-button}}`);
    await click('button');

    assert.verifySteps(['button clicked']);
  });

  test('a button shows a loading spinner while the task is running', async function(assert) {
    let helper = new TaskHelper();
    this.set('myTask', helper.task);

    await render(hbs`{{#ui-button task=myTask}}my button{{/ui-button}}`);
    click('button');

    await waitFor('[data-test-id="loading"]');
    assert.dom('[data-test-id="loading"]').exists();

    helper.finishTask();

    await waitFor('[data-test-id="loading"]', { count: 0 });
    assert.dom('[data-test-id="loading"]').doesNotExist();
  });
});

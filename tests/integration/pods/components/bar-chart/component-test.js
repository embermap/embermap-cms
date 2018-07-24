import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | bar-chart', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', [
      { label: 'First', count: 2 },
      { label: 'Second', count: 4 },
      { label: 'Third', count: 6 }
    ]);
    
    await render(hbs`{{bar-chart data=data}}`);

    assert.dom('rect').exists({ count: 3 });
  });
});

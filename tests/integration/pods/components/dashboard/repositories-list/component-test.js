import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Pretender from 'pretender';

module('Integration | Component | dashboard/repositories-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let server = new Pretender();
    server.get('https://api.github.com/search/repositories', () => {
      return [200, {}, JSON.stringify({
        items: [
          {
            name: 'emberjs',
            stargazers_count: 10000
          },
          {
            name: 'ember-cli',
            stargazers_count: 1000
          },
        ]
      })];
    });

    await render(hbs`{{dashboard/repositories-list}}`);

    assert.dom('[data-test-id="repository"]').exists({ count: 2 });
  });
});

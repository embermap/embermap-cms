import { module, test } from 'qunit';
import { run } from '@ember/runloop';
import { setupTest } from 'ember-qunit';

module('Unit | Service | cache', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    this.cache = this.owner.lookup('service:cache');
  });

  hooks.afterEach(function() {
    this.cache = null;
  });

  test('it can get & set a key', function(assert) {
    this.cache.add('number', 123);

    assert.equal(this.cache.fetch('number'), 123);
  });

  test('it can cache objects', function(assert) {
    let array = [1,2,3];

    this.cache.add('list', array);

    assert.equal(this.cache.fetch('list'), array);
  });

  test('it can cache ember models', function(assert) {
    let store = this.owner.lookup('service:store');

    let post = run(() => {
      return store.createRecord('post');
    });

    this.cache.add('post', post);

    assert.equal(this.cache.fetch('post'), post);
  });
});

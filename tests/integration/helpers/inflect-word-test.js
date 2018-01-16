
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('inflect-word', 'helper:inflect-word', {
  integration: true
});

// Replace this with your real tests.
test('it renders', function(assert) {
  this.set('inputValue', 'dog');

  this.render(hbs`{{inflect-word inputValue}}`);

  assert.equal(this.$().text().trim(), 'dogs');
});

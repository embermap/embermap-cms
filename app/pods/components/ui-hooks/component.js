import Ember from 'ember';

export default Ember.Component.extend({

  tagName: '',

  'did-insert'() {},
  'will-destroy'() {},

  didInsertElement() {
    this._super(...arguments);

    this.get('did-insert')();
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('will-destroy')();
  },

});

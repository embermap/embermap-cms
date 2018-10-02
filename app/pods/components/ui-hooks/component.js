import Component from '@ember/component';

export default Component.extend({

  tagName: '',

  'did-insert'() {},
  'will-destroy'() {},

  didInsertElement() {
    this._super(...arguments);

    this['did-insert']();
  },

  willDestroyElement() {
    this._super(...arguments);

    this['will-destroy']();
  },

});

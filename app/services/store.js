import DS from 'ember-data';

export default DS.Store.extend({

  init() {
    this._super(...arguments);

    this.set('meta', {
      albums: false,
      album: {}
    });
  },

});

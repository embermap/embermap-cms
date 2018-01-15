import DS from 'ember-data';

export default DS.Model.extend({

  album: DS.belongsTo(),

  title: DS.attr(),
  slug: DS.attr(),
  url: DS.attr(),
  style: DS.attr(),

});

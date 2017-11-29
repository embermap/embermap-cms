import DS from 'ember-data';

export default DS.Model.extend({

  title: DS.attr(),
  slug: DS.attr(),
  url: DS.attr(),
  style: DS.attr(),

  album: DS.belongsTo()

});

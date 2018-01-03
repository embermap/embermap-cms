import DS from 'ember-data';

export default DS.Model.extend({

  images: DS.hasMany(),

  title: DS.attr(),
  slug: DS.attr()

});

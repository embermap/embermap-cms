import DS from 'ember-data';

export default DS.Model.extend({

  posts: DS.hasMany(),

  name: DS.attr(),
  slug: DS.attr()

});

import DS from 'ember-data';

export default DS.Model.extend({

  comments: DS.hasMany(),
  tags: DS.hasMany({ async: false }),

  title: DS.attr(),
  text: DS.attr(),
  author: DS.attr(),
  category: DS.attr(),
  date: DS.attr(),

});

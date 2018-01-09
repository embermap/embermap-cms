import DS from 'ember-data';

export default DS.Model.extend({

  comments: DS.hasMany(),
  tags: DS.hasMany(),
  activities: DS.hasMany(),

  title: DS.attr(),
  text: DS.attr(),
  author: DS.attr(),
  category: DS.attr(),
  date: DS.attr(),

});

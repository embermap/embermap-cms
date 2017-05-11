import DS from 'ember-data';

export default DS.Model.extend({

  comments: DS.hasMany(),

  title: DS.attr(),
  author: DS.attr(),
  category: DS.attr(),
  date: DS.attr('date'),

});

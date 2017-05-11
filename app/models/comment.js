import DS from 'ember-data';

export default DS.Model.extend({

  post: DS.belongsTo(),

  text: DS.attr()

});

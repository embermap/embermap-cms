import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

let Validations = buildValidations({
  title: validator('presence', true),
  text: validator('presence', true)
})

export default DS.Model.extend(Validations, {

  comments: DS.hasMany(),
  tags: DS.hasMany(),
  activities: DS.hasMany(),

  title: DS.attr(),
  text: DS.attr(),
  author: DS.attr(),
  category: DS.attr(),
  date: DS.attr(),
  commentsCount: DS.attr(),

});

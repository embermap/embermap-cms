import { Factory, faker, trait } from 'ember-cli-mirage';

export default Factory.extend({

  text() {
    return faker.lorem.sentences(2);
  },

  author() {
    return faker.name.findName();
  },

  long: trait({
    text() {
      return faker.lorem.sentences(40);
    } 
  })

});

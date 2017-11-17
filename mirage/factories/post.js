import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({

  title() {
    let title = faker.lorem.words(3);
    return title[0].toUpperCase() + title.substr(1);
  },

  text() {
    return faker.lorem.paragraphs(5).split('\n').join('\n<br /><br />');
  },

  author() {
    return faker.name.findName();
  },

  category(i) {
    let categories = [ 'Economics', 'Programming', 'Literature' ];

    return categories[i % categories.length];
  },

  date() {
    return faker.date.past();
  }

});

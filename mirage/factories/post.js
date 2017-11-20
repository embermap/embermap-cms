import { Factory, trait, faker } from 'ember-cli-mirage';

export default Factory.extend({

  title() {
    return faker.company.catchPhrase();
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
  },

  long: trait({
    title(i) {
      return `Long post #${i}`;
    },

    text: faker.lorem.paragraphs(30).split('\n').join('\n<br /><br />')
  }),

  withComments: trait({
    afterCreate(post, server) {
      server.createList('comment', 3, {
        post
      });
    }
  })

});

import { Factory, trait, faker } from 'ember-cli-mirage';

let authors = [1, 2, 3].map(() => faker.name.findName());

export default Factory.extend({

  title() {
    let title = faker.lorem.words(3);
    return title[0].toUpperCase() + title.substr(1);
  },

  author() {
    let i = faker.random.number({ min: 0, max: 2 });

    return authors[i];
  },

  date() {
    return faker.date.past();
  },

  category() {
    let i = faker.random.number({ min: 0, max: 2 });

    return ['Economics', 'Programming', 'Literature'][i];
  },

  withComments: trait({
    afterCreate(post, server) {
      let i = faker.random.number({ min: 1, max: 4 });

      server.createList('comment', i, { post });
    }
  })

});

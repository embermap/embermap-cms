import { Factory, trait, faker } from 'ember-cli-mirage';

let authors = [1, 2, 3, 4, 5, 6].map(() => faker.name.findName());
let commentCounts = [1, 2, 5, 9, 13, 25, 60];
// let commentCounts = [1, 2, 5];

export default Factory.extend({

  title() {
    let title = faker.lorem.words(3);
    return title[0].toUpperCase() + title.substr(1);
  },

  author() {
    let i = faker.random.number({ min: 0, max: authors.length - 1 });

    return authors[i];
  },

  date() {
    return faker.date.past();
  },

  category() {
    let x = faker.random.number({ min: 0, max: 9 });
    let i;

    if (x < 4) {
      i = 0;
    } else if (x < 9) {
      i = 1;
    } else {
      i = 2;
    }

    return ['Economics', 'Programming', 'Literature'][i];
  },

  commentCount() {
    let i = faker.random.number({ min: 0, max: commentCounts.length - 1 });

    return commentCounts[i];
  },

  withComments: trait({
    afterCreate(post, server) {
      let i = faker.random.number({ min: 0, max: commentCounts.length - 1 });
      let commentCount = commentCounts[i];

      server.createList('comment', commentCount, { post });
    }
  })

});

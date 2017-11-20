import { faker } from 'ember-cli-mirage';

export default function(server) {

  server.createList('post', 3, {
    author: 'John Smith',
    category: 'Literature'
  });

  // Create a long post
  server.create('post', {
    author: 'Jane Doe',
    title: 'A very long post',
    text: faker.lorem.paragraphs(30).split('\n').join('\n<br /><br />')
  });

  // Create a post with comments
  let post = server.create('post');
  server.createList('comment', 3, {
    post
  });

}

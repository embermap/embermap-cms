export default function(server) {

  server.createList('post', 3, {
    author: 'John Smith',
    category: 'Literature'
  });

  server.createList('post', 3, 'long', {
    author: 'Jane Doe'
  });

  server.create('post', 'withComments');
  server.create('post', 'long', 'withComments');
}

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

  let city = server.create('album', {
    title: 'City living',
    slug: 'city-living'
  });
  server.create('image', {
    album: city,
    title: 'A picture',
    slug: 'a-picture',
    url: 'http://lorempixel.com/200/200/city/1'
  });

}

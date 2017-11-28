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
    title: 'Blue and white building',
    slug: 'blue-and-white-building',
    url: '/images/city/1.jpeg'
  });
  server.create('image', {
    album: city,
    title: 'Gothic halls',
    slug: 'gothic-halls',
    url: '/images/city/2.jpeg'
  });

  let animals = server.create('album', {
    title: 'Four-legged creatures',
    slug: 'four-legged-creatures'
  });
  server.create('image', {
    album: animals,
    title: 'Dog on skateboard',
    slug: 'dog-on-skateboard',
    url: '/images/animals/1.jpeg'
  });
  server.create('image', {
    album: animals,
    title: 'Furry cat',
    slug: 'furry-cat',
    url: '/images/animals/2.jpeg'
  });
  server.create('image', {
    album: animals,
    title: 'Another cat',
    slug: 'another-cat',
    url: '/images/animals/3.jpeg'
  });
  server.create('image', {
    album: animals,
    title: 'Puppy',
    slug: 'puppy',
    url: '/images/animals/4.jpeg'
  });

}

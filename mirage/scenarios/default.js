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
  [
    [ 'Blue and white building', 'light' ],
    [ 'Gothic halls', 'light' ],
    [ 'City streets', 'dark' ],
    [ 'Tall building', 'dark' ],
    [ 'Reflective tree', 'dark' ],
    [ 'Blue city sky', 'light' ],
    [ 'Traffic at night', 'dark' ],
  ].forEach(([ title, style ], i) => {
    server.create('image', {
      album: city,
      title,
      style,
      slug: title.dasherize(),
      url: `/images/city/${i + 1}.jpeg`
    });
  });

  let animals = server.create('album', {
    title: 'Four-legged creatures',
    slug: 'four-legged-creatures'
  });
  [
    [ 'Dog on skateboard', 'light' ],
    [ 'Furry cat', 'dark' ],
    [ 'Another cat', 'light' ],
    [ 'Puppy', 'dark' ],
    [ 'Curious cat', 'light' ],
    [ 'White dog', 'light' ],
    [ 'Dog in window', 'dark' ],
  ].forEach(([ title, style ], i) => {
    server.create('image', {
      album: animals,
      title,
      style,
      slug: title.dasherize(),
      url: `/images/animals/${i + 1}.jpeg`
    });
  });

}

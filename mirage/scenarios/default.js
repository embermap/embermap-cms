import moment from 'moment';

export default function(server) {
  window.server = server;

  let javascript = server.create('tag', {
    name: 'JavaScript',
    slug: 'javascript'
  });
  let css = server.create('tag', {
    name: 'CSS',
    slug: 'css'
  });
  let opinion = server.create('tag', {
    name: 'Opinion',
    slug: 'opinion'
  });

  server.create('post', 'withComments', {
    title: 'Top 10 JavaScript libraries to learn',
    tags: [ javascript, opinion ],
    activities: [
      server.create('activity', {
        text: 'The JavaScript tag was added',
        createdAt: moment().subtract(7, 'days').toISOString()
      }),
      server.create('activity', {
        text: 'The Opinion tag was added',
        createdAt: moment().subtract(3, 'day').toISOString()
      }),
    ]
  });
  server.create('post', {
    title: "Why Silicon Valley needs South Dakota",
    tags: [ opinion ]
  });
  server.create('post', {
    title: "Mastering the Grid",
    tags: [ css ]
  });

  // Media data creation
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

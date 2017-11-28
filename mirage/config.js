import { faker } from 'ember-cli-mirage';

// Lock randomly generated data from faker
faker.seed(123);

export default function() {

  this.resource('posts');
  this.get('albums', (schema, request) => {
    let slug = request.queryParams['filter[slug]'];
    let albums;

    if (slug) {
      albums = schema.albums.where({ slug });
    } else {
      albums = schema.albums.all();
    }

    return albums;
  });

  this.get('images', (schema, request) => {
    let slug = request.queryParams['filter[slug]'];
    let images;

    if (slug) {
      images = schema.images.where({ slug });
    } else {
      images = schema.images.all();
    }

    return images;
  });
}

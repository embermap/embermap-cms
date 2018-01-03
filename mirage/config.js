import { faker } from 'ember-cli-mirage';

// Lock randomly generated data from faker
faker.seed(123);

function filterable(resourceName, attrs) {
  return (schema, request) => {
    let filters = attrs.reduce((hash, attr) => {
      let val = request.queryParams[`filter[${attr}]`];
      if (val) {
        hash[attr] = val;
      }

      return hash;
    }, {});

    return schema[resourceName].where(filters);
  }
}

export default function() {
  this.resource('posts');
  this.resource('tags');

  this.get('albums', filterable('albums', [ 'slug' ]));
  this.get('images', filterable('images', [ 'slug', 'style' ]));
  this.get('tags', filterable('tags', [ 'slug' ]));
  // this.get('tags');
}

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
  window.server = this;

  this.resource('posts');

  this.get('albums', filterable('albums', [ 'slug' ]));
  this.get('images', filterable('images', [ 'slug', 'style' ]));
}

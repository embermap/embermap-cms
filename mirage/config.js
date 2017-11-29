import { faker } from 'ember-cli-mirage';

// Lock randomly generated data from faker
faker.seed(123);

export default function() {
  window.server = this;

  this.resource('posts');

  this.get('albums');
  this.get('images');
}

import { faker } from 'ember-cli-mirage';
import filterable from './utils/filterable';

// Lock randomly generated data from faker
faker.seed(123);

export default function() {
  this.timing = 20;

  this.resource('tags');
  this.resource('posts');

  this.get('albums', filterable('albums', [ 'slug' ]));
  this.get('images', filterable('images', [ 'slug', 'style' ]));
  this.get('tags', filterable('tags', [ 'slug' ]));
}

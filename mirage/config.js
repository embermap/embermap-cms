import { faker } from 'ember-cli-mirage';

faker.seed(123);

export default function() {

  // this.timing = 1;

  this.resource('posts');
}

import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  post: null,

  'on-delete'() {},
  'on-cancel'() {},

  flashMessages: service(),

  deletePost: task(function*() {
    let post = this.get('post');

    yield post.destroyRecord();
    this.get('on-delete')();

    this.get('flashMessages').success('Post successfully deleted!');
  })
});

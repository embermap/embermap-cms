import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default Component.extend({
  post: null,

  'on-delete'() {},
  'on-cancel'() {},

  flashMessages: service(),

  deletePost: task(function*() {
    let post = this.post;

    yield post.destroyRecord();
    this['on-delete']();
  })
});

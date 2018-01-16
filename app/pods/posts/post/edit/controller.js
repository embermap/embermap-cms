import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({

  router: service(),

  save: task(function*() {
    yield this.get('model').save();
    yield this.get('router').transitionTo('posts.post.index');
  })

});

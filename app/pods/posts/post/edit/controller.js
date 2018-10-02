import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({

  router: service(),

  save: task(function*() {
    yield this.model.save();
    yield this.router.transitionTo('posts.post.index');
  })

});

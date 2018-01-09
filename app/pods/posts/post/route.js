import Route from '@ember/routing/route';
import { task, timeout } from 'ember-concurrency';

export default Route.extend({

  model({ post_id }) {
    return this.get('store').findRecord('post', post_id, {
      include: 'comments,tags,activities'
    });
  },

  setupController() {
    this._super(...arguments);

    this.get('poll').perform();
  },

  poll: task(function * (id) {
    while (true) {
      yield timeout(2000);
      yield this.refresh();
    }
  }).cancelOn('deactivate').restartable(),

});

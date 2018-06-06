import Component from '@ember/component';
import { task, timeout } from 'ember-concurrency';

export default Component.extend({
  count: 0,

  longRunningTask: task(function*() {
    yield timeout(3000);
    this.incrementProperty('count');
  }),

  actions: {
    incrementCounter() {
      this.incrementProperty('count');
    }
  }
});

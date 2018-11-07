import Component from '@ember/component';
import { task, timeout, all } from 'ember-concurrency';

export default Component.extend({
  tagName: 'form',

  onSubmit() {},
  afterSubmit() {},

  submit(event) {
    event.preventDefault();
    this.submitTask.perform();
  },

  submitTask: task(function*() {
    yield all([
      timeout(750),
      this.onSubmit()
    ]);
    yield this.afterSubmit();
  })
});

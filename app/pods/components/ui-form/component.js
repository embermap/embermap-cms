import Component from '@ember/component';
import { task } from 'ember-concurrency';

export default Component.extend({
  tagName: 'form',

  onSubmit() {},

  submit(event) {
    event.preventDefault();
    this.submitTask.perform();
  },

  submitTask: task(function*() {
    yield this.onSubmit();
  })
});

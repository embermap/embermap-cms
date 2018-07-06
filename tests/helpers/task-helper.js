import { task } from 'ember-concurrency';

export default class TaskHelper {
  constructor() {
    let promise = new Promise(resolve => {
      this.finishTask = resolve;
    });

    this.task = task(function*() {
      yield promise;
    });
  }
}

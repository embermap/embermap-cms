import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

export default Controller.extend({

  router: service(),
  flashMessages: service(),

  save: task(function*() {
    let { validations } = yield this.model.validate();
    if (validations.isValid) {
      yield this.model.save();
    } else {
      throw "The form is invalid";
    }
  }),

  afterSave: task(function*() {
    this.flashMessages.success('The post was successfully saved!');
    yield this.router.transitionTo('posts.post.index');
  }),

  actions: {
    cancel() {
      this.transitionToRoute('posts.post', this.model);
    }
  }

});

import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyUp } from 'ember-keyboard';


export default Ember.Controller.extend(EKMixin, {

  reloadPosts: Ember.on(keyUp('KeyR'), function() {
    this.set('isLoading', true);

    Ember.run.later(() => {
      this.set('isLoading', false);
    }, 2000);
  }),

  actions: {
    activateKeyboard() {
      this.set('keyboardActivated', true);
    },
    deactivateKeyboard() {
      this.set('keyboardActivated', false);
    }
  }

});

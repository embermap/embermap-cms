import { later } from '@ember/runloop';
import { on } from '@ember/object/evented';
import Controller from '@ember/controller';
import { EKMixin } from 'ember-keyboard';
import { keyUp } from 'ember-keyboard';


export default Controller.extend(EKMixin, {

  reloadPosts: on(keyUp('KeyR'), function() {
    this.set('isLoading', true);

    later(() => {
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

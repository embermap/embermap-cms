import Ember from 'ember';
import { EKMixin } from 'ember-keyboard';
import { keyUp } from 'ember-keyboard';

export default Ember.Controller.extend(EKMixin, {

  activateKeyboard: Ember.on('init', function() {
    this.set('keyboardActivated', true);
  }),

  toggleShowMore: Ember.on(keyUp('KeyR'), function() {
    console.log('Pressing R');
    this.set('isLoading', true);

    Ember.run.later(() => {
      this.set('isLoading', false);
    }, 2000);
  }),


});

import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isShowingNav: true,

  isShowingSpeedControl: computed({
    get() {
      return window.localStorage.getItem('isShowingSpeedControl') === 'true';
    },

    set(key, value) {
      window.localStorage.setItem('isShowingSpeedControl', value);
      return value;
    }
  }),
});

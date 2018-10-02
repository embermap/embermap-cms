import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  didInsertElement() {
    this._super(...arguments);

    if (!this.timing) {
      this.set('timing', window.server.timing);
    }
  },

  timing: computed({
    get() {
      return window.localStorage.getItem('timing');
    },

    set(key, value) {
      window.localStorage.setItem('timing', value);
      window.server.timing = +value;
      return value;
    }
  }),

  actions: {
    updateTiming(event) {
      this.set('timing', event.target.value);
    }
  }
});

import Component from '@ember/component';

export default Component.extend({
  isOffline: false,

  didInsertElement() {
    this._super(...arguments);

    window.addEventListener('online',  () => { this.updateStatus(); });
    window.addEventListener('offline', () => { this.updateStatus(); });

    this.updateStatus();
  },

  updateStatus() {
    this.set('isOffline', !navigator.onLine);
  }
});

import Component from '@ember/component';

export default Component.extend({
  isOffline: false,

  didInsertElement() {
    this._super(...arguments);

    let _update = () => { this.updateStatus(); };
    this.set('_update', _update);

    window.addEventListener('online',  _update);
    window.addEventListener('offline', _update);

    this.updateStatus();
  },

  willDestroyElement() {
    this._super(...arguments);
    let _update = this.get('_update');
    window.removeEventListener('online', _update);
    window.removeEventListener('offline', _update);
  },

  updateStatus() {
    this.set('isOffline', !navigator.onLine);
  }
});

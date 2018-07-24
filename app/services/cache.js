import Service from '@ember/service';

export default Service.extend({
  init() {
    this._super(...arguments);
    this.set('cache', {});
  },

  add(key, value) {
    let cache = this.get('cache');
    cache[key] = value;
  },

  fetch(key) {
    let cache = this.get('cache');
    return cache[key];
  }
});

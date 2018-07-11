import Service from '@ember/service';

let cache = {};

export default Service.extend({
  cache,

  add(key, value) {
    let cache = this.get('cache');
    cache[key] = value;
  },

  fetch(key) {
    let cache = this.get('cache');
    return cache[key];
  }
});

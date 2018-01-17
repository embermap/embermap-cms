import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { assertionInjector, assertionCleanup } from '../assertions';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();
      assertionInjector(this.application);

      if (options.beforeEach) {
        return options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach)
        .then(() => assertionCleanup(this.application))
        .then(() => destroyApp(this.application));
    }
  });
}

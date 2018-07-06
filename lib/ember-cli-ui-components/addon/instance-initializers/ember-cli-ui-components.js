/*global window */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

const StyleguideApplicationRoute = Route.extend({
  router: service('-routing'),

  renderTemplate(controller, model) {
    if (window.location.href.match('/styleguide')) {
      this.render('applicationStyleguide', {
        controller: this.controllerFor('applicationStyleguide')
      });
    } else {
      this._super(...arguments);
    }
  }
})

export function initialize(appInstance) {
  let fastboot = appInstance.lookup('service:fastboot');

  if ((!fastboot || !fastboot.get('isFastBoot')) && window.location.href.match('/styleguide')) {
    appInstance.register('route:application', StyleguideApplicationRoute);
  }
}

export default {
  name: 'ember-cli-ui-components',
  initialize
};

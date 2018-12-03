import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import Model from 'ember-data/model';
import { computed } from '@ember/object';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

Model.reopen({
  lastSaveFailed: computed('isError', 'isValid', function() {
    return this.isError || !this.isValid;
  })
});

loadInitializers(App, config.modulePrefix);

export default App;

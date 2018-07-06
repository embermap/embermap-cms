/* eslint-env node */
'use strict';

module.exports = {
  name: 'ember-cli-ui-components',

  isDevelopingAddon() {
    return true;
  },

  included(includer) {
    if (includer.parent) {
      throw new Error(`ember-cli-ui-components should be in your package.json's devDependencies`);
    }

    this._super.included.apply(this, arguments);

    // includer.options.snippetSearchPaths = includer.options.snippetSearchPaths || ['tests/dummy/app'];
    includer.options.snippetRegexes = Object.assign({}, {
      begin: /{{#(?:docs-snippet|demo.example|demo.live-example)\sname=(?:"|')(\S+)(?:"|')/,
      end: /{{\/(?:docs-snippet|demo.example|demo.live-example)}}/,
    }, includer.options.snippetRegexes);
  }

};

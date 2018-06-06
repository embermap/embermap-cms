import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { getOwner } from '@ember/application';

export default Controller.extend({

  componentName: readOnly('model.component_name'),

  componentLabel: computed('componentName', function() {
    let name = this.get('componentName')
      .replace('ui-', '')
      .capitalize();

    return `UI ${name}`;
  }),

  hasCustomStyleguideComponent: computed('componentName', function() {
    let componentName = this.get('componentName');
    let path = `styleguide/components/${componentName}`;
    let owner = getOwner(this);

    let template = owner.lookup(`template:${path}`);
    let component = owner.lookup(`component:${path}`);

    return template || component;
  }),

});

import Component from '@ember/component';
import layout from './template';
import { getOwner } from '@ember/application';
import StyleGroup from 'ember-cli-ui-components/lib/style-group';
import { readOnly } from '@ember/object/computed';
import { capitalize } from '@ember/string';
import { computed } from '@ember/object';

export default Component.extend({
  layout,

  componentName: readOnly('for'),

  componentStyles: computed('for', function() {
    let componentClass = getOwner(this).lookup(`component:${this.get('componentName')}`);
    let allStyles = componentClass.styles;
    return Object.keys(allStyles)
      .filter(key => {
        return (key !== 'base');
      })
      .reduce((styles, key) => {
        if (key === 'defaultStyle') {
          styles.push({
            type: 'default',
            name: 'Default style',
            text: `The default style is: ${allStyles[key]}`
          });
        } else if (allStyles[key] instanceof StyleGroup) {
          let group = allStyles[key];
          styles.push({
            type: 'group',
            name: capitalize(group.name),
            styles: Object.keys(group.styles)
          });
        } else
          styles.push({
            type: 'style',
            name: capitalize(key),
            styles: [ key ]
          });

        return styles;
      }, []);
  })
});

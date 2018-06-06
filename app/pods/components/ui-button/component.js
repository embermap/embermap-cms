import Component from '@ember/component';
import { Styled } from 'ember-cli-ui-components';
import { oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend(Styled, {
  tagName: '',

  styles: computed(function() {
    return {};
  }),

  disabled: oneWay('task.isRunning'),

  task: null,
  onClick() {},

  actions: {
    click() {
      let task = this.get('task');
      let onClick = this.get('onClick');

      if (task) {
        task.perform();
      } else {
        onClick();
      }
    }
  }

});

import Component from '@ember/component';
import { Styled, group } from 'ember-cli-ui-components';
import { oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Component.extend(Styled, {
  tagName: '',

  styles: computed(function() {
    return {
      defaultStyle: 'blue',

      colors: group({
        blue: 'bg-blue text-white',
        gray: 'bg-grey-lighter text-black'
      })
    };
  }),

  type: "button",

  disabled: oneWay('task.isRunning'),

  task: null,
  onClick() {},

  actions: {
    click(event) {
      event.preventDefault();

      let task = this.task;
      let onClick = this.onClick;

      if (task) {
        task.perform();
      } else {
        onClick();
      }
    }
  }

});

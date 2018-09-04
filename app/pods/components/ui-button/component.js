import Component from '@ember/component';
import { Styled } from 'ember-cli-ui-components';
import { oneWay } from '@ember/object/computed';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend(Styled, {
  tagName: '',

  styles: computed(function() {
    return {};
  }),

  disabled: oneWay('handleClick.isRunning'),

  task: null,
  onClick() {},

  actions: {
    click() {
      return this.get('handleClick').perform();
    }
  },

  handleClick: task(function*() {
    let task = this.get('task');
    let onClick = this.get('onClick');

    if (task) {
      yield task.perform();
    } else {
      yield onClick();
    }
  })

});

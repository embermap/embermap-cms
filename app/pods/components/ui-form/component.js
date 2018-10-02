import Component from '@ember/component';

export default Component.extend({
  tagName: 'form',

  onSubmit() {},

  submit(event) {
    event.preventDefault();
    this.onSubmit();
  }
});

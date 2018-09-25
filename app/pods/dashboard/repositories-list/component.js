import Component from '@ember/component';

export default Component.extend({

  didInsertElement() {
    this._super(...arguments);

    fetch('https://api.github.com/search/repositories?q=org:embermap')
      .then(response => response.json())
      .then(data => {
        this.set('items', data.items);
      });
  }

});

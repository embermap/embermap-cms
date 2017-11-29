import Route from '@ember/routing/route';

export default Route.extend({

  model(params) {
    return this.store.query('image', {
      filter: {
        style: params.style
      }
    });
  },

});

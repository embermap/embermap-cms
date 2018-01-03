import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    return this.get('storefront').findAll('post', {
      include: 'comments,tags'
    });
  }

});

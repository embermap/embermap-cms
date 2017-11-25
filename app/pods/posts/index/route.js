import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    let reload = !this.get('hasCalledFindAll');

    return this.store.findAll('post', {
      include: 'comments',
      reload
    }).then(posts => {
      this.set('hasCalledFindAll', true);
      return posts;
    });
  },

});

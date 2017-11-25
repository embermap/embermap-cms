import Route from '@ember/routing/route';

export default Route.extend({

  model({ post_id }) {
    return this.store.findRecord('post', post_id, {
      include: 'comments'
    });
  },

});

import Ember from 'ember';

export default Ember.Route.extend({

  model({ post_id }) {
    return this.store.findRecord('post', post_id, {
      include: 'comments'
    });
  },

});

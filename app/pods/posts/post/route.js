import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  model({ post_id }) {
    return this.get('storefront').loadRecord('post', post_id, {
      include: 'comments,tags'
    });
  },

});
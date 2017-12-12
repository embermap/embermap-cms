import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  storefront: service(),

  model() {
    return this.get('storefront').loadAll('tag', {
      include: 'posts'
    });
  }

});

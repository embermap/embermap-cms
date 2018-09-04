import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  post: null,

  'on-cancel'() {},
  'after-delete'() {},

  flashMessages: service(),

  actions: {
    deletePost() {
      let post = this.get('post');

      return post.destroyRecord().then(() => {
        this.get('after-delete')();

        setTimeout(() => {
          this.get('flashMessages').success('Post successfully deleted!');
        }, 1000);
      });
    }
  }
});

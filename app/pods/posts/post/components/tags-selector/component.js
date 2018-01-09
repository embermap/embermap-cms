import Component from '@ember/component';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  store: service(),

  loadTags: task(function * () {
    return yield this.get('store').findAll('tag');
  }).on('init'),

  tags: readOnly('loadTags.lastSuccessful.value'),

  toggleTag: task(function * (tag) {
    let post = this.get('post');
    let tags = post.get('tags');

    if (tags.includes(tag)) {
      tags.removeObject(tag);
    } else {
      tags.addObject(tag);
    }

    yield post.save();
  })

});

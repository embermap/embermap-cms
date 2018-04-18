import Component from '@ember/component';
import { computed } from '@ember/object';
import { gt } from '@ember/object/computed';

export default Component.extend({
  comment: null,

  isExpanded: false,

  words: computed('comment.text', function() {
    return this.get('comment.text').split(/\s/);
  }),

  isLong: gt('words.length', 24),
});

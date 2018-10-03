import Component from '@ember/component';
import { computed } from '@ember/object';
import { guidFor } from '@ember/object/internals';

export default Component.extend({
  tagName: '',
  uniqueId: computed(function() {
    return `${guidFor(this)}-input`;
  })
});

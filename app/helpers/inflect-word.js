import { helper } from '@ember/component/helper';
import { singularize, pluralize } from 'ember-inflector'

export function inflectWord([ word, count ]) {
  return count === 1 ? singularize(word) : pluralize(word);
}

export default helper(inflectWord);

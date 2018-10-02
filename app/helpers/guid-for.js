import { helper } from '@ember/component/helper';
import { guidFor as guid } from '@ember/object/internals';

export function guidFor(params/*, hash*/) {
  return guid(params[0]);
}

export default helper(guidFor);

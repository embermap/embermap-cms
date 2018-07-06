import { helper } from '@ember/component/helper';

export default helper(function([ component, style ], hash) {
  return component.get('activeStyles').includes(style);
});

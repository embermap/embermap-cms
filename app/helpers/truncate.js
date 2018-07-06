import Helper from '@ember/component/helper';

export default Helper.extend({
  compute: function([ text, size = 25 ]) {
    return text.split(/\s/).slice(0, size).join(' ');
  }
});

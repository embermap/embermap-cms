import Helper from '@ember/component/helper';

export default Helper.extend({
  compute: function([ text ]) {
    return text ? text.split(/\n/).join('<br>') : "";
  }
});

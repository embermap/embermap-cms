import Component from '@ember/component';
import layout from './template';

export default Component.extend({
  layout,

  tagName: 'li',
  classNames: 'sg-viewer-nav-item'

}).reopenClass({

  positionalParams: ['label', 'route', 'model']

});

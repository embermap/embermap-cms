import Ember from 'ember';
import { select } from 'd3-selection';

export default Ember.Component.extend({

  tagName: 'svg',

  didInsertElement() {
    let svg = select(this.$()[0]);
    // let margin = { top: 20, right: 20, bottom: 30, left: 40 };
    // let width = +svg.attr("width") - margin.left - margin.right;
    // let height = +svg.attr("height") - margin.top - margin.bottom;

    let g = svg.append('g');

    g.append('rect')
      .attr('width', 10)
      .attr('height', 100);

    g.append('rect')
      .attr('x', 20)
      .attr('width', 10)
      .attr('height', 130);
  }

});

import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';

export default Ember.Component.extend({

  data: [],

  didInsertElement() {
    let counts = this.get('data').map(data => data.count);
    let yScale = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range([ 0, 100 ]);

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.label))
      .range([ 0, 100 ])
      .paddingInner(0.12);

    let svg = select(this.$('svg')[0]);

    svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', data => `${yScale(data.count)}%`)
      .attr('x', data => `${xScale(data.label)}%`)
      .attr('y', data => `${100 - yScale(data.count)}%`);
  }

});

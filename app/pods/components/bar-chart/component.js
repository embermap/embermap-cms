import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

export default Ember.Component.extend({

  tagName: 'svg',

  data: [
    { label: 'Economics', count: 12 },
    { label: 'Literature', count: 8 },
    { label: 'Programming', count: 20 },
    { label: 'Philosophy', count: 10 },
  ],

  didInsertElement() {
    let height = this.$().parent().height();
    let width = this.$().parent().width();

    let svg = select(this.$()[0])
      .attr('width', width)
      .attr('height', height);

    let xScale = scaleBand()
      .domain(this.data.map(d => d.label))
      .range([0, width])
      .padding(0.12);

    let yScale = scaleLinear()
      .domain([ 0, max(this.data.map(d => d.count)) ])
      .range([0, height]);

    this.data.forEach((d) => {
      svg.append('rect')
        .attr('width', xScale.bandwidth())
        .attr('height', yScale(d.count))
        .attr('x', xScale(d.label))
        .attr('y', height - yScale(d.count));
    });
  }

});

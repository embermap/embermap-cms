import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';

export default Ember.Component.extend({

  authors: [
    { name: 'Mark Twain', count: 15 },
    { name: 'Virginia Woolf', count: 42 },
    { name: 'John Steinbeck', count: 23 },
    { name: 'Ralph Ellison', count: 27 }
  ],

  didInsertElement() {
    let authorCounts = this.get('authors').map(author => author.count);
    let yScale = scaleLinear()
      .domain([ 0, Math.max(...authorCounts) ])
      .range([ 0, 150 ]);

    let xScale = scaleBand()
      .domain(this.get('authors').map(author => author.name))
      .range([ 0, 300 ])
      .paddingInner(0.12);

    let svg = select(this.$('svg')[0]);

    svg.selectAll('rect').data(this.get('authors'))
      .enter()
      .append('rect')
      .attr('width', xScale.bandwidth())
      .attr('height', author => yScale(author.count))
      .attr('x', author => xScale(author.name))
      .attr('y', author => 150 - yScale(author.count));
  }

});

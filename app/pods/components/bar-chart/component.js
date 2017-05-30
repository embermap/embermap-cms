import Ember from 'ember';
import { select } from 'd3-selection';

export default Ember.Component.extend({

  authors: [
    { name: 'Mark Twain', count: 15 },
    { name: 'Virginia Woolf', count: 42 },
    { name: 'John Steinbeck', count: 23 },
    { name: 'Ralph Ellison', count: 27 }
  ],

  didInsertElement() {
    let svg = select(this.$('svg')[0]);

    svg.selectAll('rect').data(this.get('authors'))
      .enter()
      .append('rect')
      .attr('width', 20)
      .attr('height', author => author.count)
      .attr('x', (author, index) => 25 * index);
  }

});

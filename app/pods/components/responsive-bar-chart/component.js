import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';

const colors = {
  blue: [ '#bbdefb', '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Ember.Component.extend({

  color: 'blue',
  selectedLabel: null,

  highlightedData: Ember.computed('hoveredLabel', 'selectedLabel', function() {
    let targetLabel;

    if (this.get('selectedLabel')) { // null or undefined
      targetLabel = this.get('selectedLabel');
    } else if (this.get('hoveredLabel') !== undefined) {
      targetLabel = this.get('hoveredLabel');
    }

    return this.get('data').find((d) => {
      return d.label === targetLabel;
    });
  }),

  highlightedBar: Ember.computed('highlightedData', 'bars', function() {
    if (this.get('bars') && this.get('highlightedData')) {
      return this.get('bars')
        .filter((d) => d === this.get('highlightedData'))
        .node();
    }
  }),

  didInsertElement() {
    let svg = select(this.$('svg')[0]);

    let xScale = scaleBand()
      .domain(this.get('data').map(d => d.label))
      .range([0, 100])
      .padding(0.2);

    let yScale = scaleLinear()
      .domain([ 0, max(this.get('data').map(d => d.count)) ])
      .range([0, 100]);

    let color = scaleLinear()
      .domain([ 0, max(this.get('data').map(d => d.count)) ])
      .range(colors[this.get('color')]);

    let bars = svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', (d) => `${yScale(d.count)}%`)
      .attr('x', (d) => `${xScale(d.label)}%`)
      .attr('y', (d) => `${100 - yScale(d.count)}%`)
      .attr('fill', (d) => color(d.count));

    bars.on('mouseover', (d) => {
      this.set('hoveredLabel', d.label);
    });

    bars.on('mouseout', () => {
      this.set('hoveredLabel', undefined);
    });

    bars.on('click', (d) => {
      this.get('on-click')(d.label);
    });

    this.set('bars', bars);
  },

  didRender() {
    if (this.get('bars')) {
      let label = this.get('selectedLabel');

      this.get('bars')
        .attr('opacity', (d) => {
          if (label) {
            return (d.label === label) ? '1' : '0.5';
          } else {
            return '1';
          }
        });
    }
  }
});

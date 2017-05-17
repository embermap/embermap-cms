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

  highlightedData: Ember.computed('hoveredLabel', 'selectedLabel', function() {
    let targetLabel;

    if (this.get('selectedLabel') !== undefined) {
      targetLabel = this.get('selectedLabel');
    } else if (this.get('hoveredLabel') !== undefined) {
      targetLabel = this.get('hoveredLabel');
    }

    return this.get('data').find((d) => {
      return d.label === targetLabel;
    });
  }),

  highlightedBar: Ember.computed('highlightedData', function() {
    let i = this.get('data').indexOf(this.get('highlightedData'));

    return this.$('rect')[i];
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

    let bars = svg.selectAll('rect')
      .data(this.get('data'))
      .enter().append('rect')
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

    bars.on('click', ({ label }) => {
      if (this.get('selectedLabel') !== label) {
        this.set('selectedLabel', label);

        bars.filter((d) => d.label !== label)
          .attr('opacity', '0.5');
        bars.filter((d) => d.label === label)
          .attr('opacity', '1');
      } else {
        this.set('selectedLabel', undefined);
        bars.attr('opacity', '1');
      }
    });
  }
});

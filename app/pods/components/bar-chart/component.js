import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';

const COLORS = {
  blue: [ '#bbdefb' , '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Ember.Component.extend({

  color: 'blue',
  data: [],

  highlightedLabel: Ember.computed.or('selectedLabel', 'hoveredLabel'),

  tooltipTarget: Ember.computed('didRenderChart', 'highlightedLabel', function() {
    return select(this.$('svg')[0]).selectAll('rect')
      .filter(data => data.label === this.get('highlightedLabel'))
      .node();
  }),

  didInsertElement() {
    let counts = this.get('data').map(data => data.count);
    let yScale = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range([ 0, 100 ]);

    let color = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range(COLORS[this.get('color')]);

    let xScale = scaleBand()
      .domain(this.get('data').map(data => data.label))
      .range([ 0, 100 ])
      .paddingInner(0.12);

    let svg = select(this.$('svg')[0]);

    let bars = svg.selectAll('rect').data(this.get('data'))
      .enter()
      .append('rect')
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', data => `${yScale(data.count)}%`)
      .attr('x', data => `${xScale(data.label)}%`)
      .attr('y', data => `${100 - yScale(data.count)}%`)
      .attr('fill', data => color(data.count));

    bars
      .on('mouseover', data => {
        this.set('hoveredLabel', data.label);
      })
      .on('mouseout', () => {
        this.set('hoveredLabel', null);
      })
      .on('click', data => {
        let clickedLabel = data.label;

        if (clickedLabel === this.get('selectedLabel')) {
          this.set('selectedLabel', '');
        } else {
          this.set('selectedLabel', clickedLabel);
        }

        this.updateOpacities();
      });

    this.updateOpacities();
    this.set('didRenderChart', true);
  },

  updateOpacities() {
    let bars = select(this.$('svg')[0]).selectAll('rect');

    if (!this.get('selectedLabel')) {
      bars.attr('opacity', '1.0');

    } else {
      bars.filter(data => data.label !== this.get('selectedLabel'))
        .attr('opacity', '0.5');
      bars.filter(data => data.label === this.get('selectedLabel'))
        .attr('opacity', '1.0');
    }
  }

});

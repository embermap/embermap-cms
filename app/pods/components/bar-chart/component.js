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
  'on-click': null,

  highlightedLabel: Ember.computed.or('selectedLabel', 'hoveredLabel'),

  tooltipTarget: Ember.computed('didRenderChart', 'highlightedLabel', function() {
    return select(this.$('svg')[0]).selectAll('rect')
      .filter(data => data.label === this.get('highlightedLabel'))
      .node();
  }),

  didInsertElement() {
    this.renderChart();
    this.updateOpacities();
    this.set('didRenderChart', true);
  },

  didUpdateAttrs() {
    this.renderChart();
    this.updateOpacities();
  },

  renderChart() {
    let data = this.get('data').sortBy('label');
    let counts = data.map(data => data.count);
    let yScale = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range([ 0, 100 ]);

    let color = scaleLinear()
      .domain([ 0, Math.max(...counts) ])
      .range(COLORS[this.get('color')]);

    let xScale = scaleBand()
      .domain(data.map(data => data.label))
      .range([ 0, 100 ])
      .paddingInner(0.12);

    let svg = select(this.$('svg')[0]);

    let barsUpdate = svg.selectAll('rect').data(data);
    let barsEnter = barsUpdate.enter().append('rect');
    let barsExit = barsUpdate.exit();

    barsEnter
      .merge(barsUpdate)
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', data => `${yScale(data.count)}%`)
      .attr('x', data => `${xScale(data.label)}%`)
      .attr('y', data => `${100 - yScale(data.count)}%`)
      .attr('fill', data => color(data.count));

    barsExit.remove();

    barsEnter
      .on('mouseover', data => {
        this.set('hoveredLabel', data.label);
      })
      .on('mouseout', () => {
        this.set('hoveredLabel', null);
      })
      .on('click', data => {
        let clickedLabel = data.label;

        if (this.get('on-click')) {
          this.get('on-click')(clickedLabel);
        } else {
          if (clickedLabel === this.get('selectedLabel')) {
            this.set('selectedLabel', '');
          } else {
            this.set('selectedLabel', clickedLabel);
          }

          this.updateOpacities();
        }
      });

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

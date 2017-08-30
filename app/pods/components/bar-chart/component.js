/* global Tether */
import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import 'd3-transition';

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
    this.set('yScale', scaleLinear().range([ 0, 100 ]));
    this.set('colorScale', scaleLinear().range(COLORS[this.get('color')]));
    this.set('xScale', scaleBand().range([ 0, 100 ]).paddingInner(0.12));

    this.renderChart();
    this.set('didRenderChart', true);
  },

  didUpdateAttrs() {
    this.renderChart();
  },

  renderChart() {
    let data = this.get('data').sortBy('label');
    let counts = data.map(data => data.count);

    this.get('yScale').domain([ 0, Math.max(...counts) ]);
    this.get('colorScale').domain([ 0, Math.max(...counts) ]);
    this.get('xScale').domain(data.map(data => data.label));

    let svg = select(this.$('svg')[0]);
    let barsUpdate = svg.selectAll('rect').data(data, data => data.label);
    let barsEnter = barsUpdate.enter()
      .append('rect')
      .attr('opacity', 0);
    let barsExit = barsUpdate.exit();

    let rafId;
    barsEnter
      .merge(barsUpdate)
      .transition()
      .attr('width', `${this.get('xScale').bandwidth()}%`)
      .attr('height', data => `${this.get('yScale')(data.count)}%`)
      .attr('x', data => `${this.get('xScale')(data.label)}%`)
      .attr('y', data => `${100 - this.get('yScale')(data.count)}%`)
      .attr('fill', data => this.get('colorScale')(data.count))
      .attr('opacity', data => {
        let selected = this.get('selectedLabel');

        return (selected && data.label !== selected) ? '0.5' : '1.0';
      })
      .on('start', (data, index) => {
        if (index === 0) {
          (function updateTether() {
            Tether.position()
            rafId = requestAnimationFrame(updateTether);
          })();
        }
      })
      .on('end interrupt', (data, index) => {
        if (index === 0) {
          cancelAnimationFrame(rafId);
        }
      });

    barsExit
      .transition()
      .attr('opacity', 0)
      .remove();

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

          this.renderChart();
        }
      });
  }

});

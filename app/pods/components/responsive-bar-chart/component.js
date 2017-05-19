/* global Tether */
import Ember from 'ember';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { transition } from 'd3-transition';
import { max } from 'd3-array';

const colors = {
  blue: [ '#bbdefb', '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Ember.Component.extend({

  color: 'blue',
  selectedLabel: null,

  highlightedData: Ember.computed('hoveredLabel', 'selectedLabel', 'data.[]', function() {
    let targetLabel;

    if (this.get('selectedLabel')) {
      targetLabel = this.get('selectedLabel');
    } else if (this.get('hoveredLabel') !== undefined) {
      targetLabel = this.get('hoveredLabel');
    }

    return this.get('data').find((d) => {
      return d.label === targetLabel;
    });
  }),

  highlightedBar: Ember.computed('highlightedData', 'didRenderChart', function() {
    if (this.get('didRenderChart') && this.get('highlightedData')) {
      return select(this.$('svg')[0]).selectAll('rect')
        .filter((d) => d === this.get('highlightedData'))
        .node();
    }
  }),

  didInsertElement() {
    this.set('xScale', scaleBand()
      .range([0, 100])
      .padding(0.2));

    this.set('yScale', scaleLinear()
      .range([0, 100]));

    this.set('colorScale', scaleLinear()
      .range(colors[this.get('color')]));

    this.renderChart();
  },

  didUpdateAttrs() {
    this.renderChart();
  },

  renderChart() {
    let { xScale, yScale, colorScale } = this.getProperties('xScale', 'yScale', 'colorScale');
    let data = this.get('data').sortBy('label');

    xScale.domain(data.map(d => d.label));
    yScale.domain([ 0, max(data.map(d => d.count)) ]);
    colorScale.domain([ 0, max(data.map(d => d.count)) ]);

    let bars = select(this.$('svg')[0])
      .selectAll('rect')
      .data(data, (d) => d.label);

    let barsEnter = bars
      .enter()
      .append('rect')
      .attr('opacity', 0);

    let label = this.get('selectedLabel');

    let rafId;
    let t = transition()
      .on('start', function(d, i) {
        if (i === 0) {
          (function updateTether() {
            Tether.position();
            rafId = requestAnimationFrame(updateTether);
          })();
        }
      })
      .on('end interrupt', (d, i) => {
        if (i === 0) {
          cancelAnimationFrame(rafId);
        }
      });

    barsEnter.merge(bars)
      .transition(t)
      .attr('width', `${xScale.bandwidth()}%`)
      .attr('height', (d) => `${yScale(d.count)}%`)
      .attr('x', (d) => `${xScale(d.label)}%`)
      .attr('y', (d) => `${100 - yScale(d.count)}%`)
      .attr('fill', (d) => colorScale(d.count))
      .attr('opacity', (d) => {
        if (label) {
          return (d.label === label) ? '1' : '0.5';
        } else {
          return '1';
        }
      });

    bars.exit()
      .transition()
      .attr('opacity', 0)
      .remove();

    barsEnter.on('mouseover', (d) => {
      this.set('hoveredLabel', d.label);
    });

    barsEnter.on('mouseout', () => {
      this.set('hoveredLabel', undefined);
    });

    barsEnter.on('click', (d) => {
      this.get('on-click')(d.label);
    });

    this.set('didRenderChart', true);
  }

});

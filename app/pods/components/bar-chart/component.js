/* global Tether */
import { computed } from '@ember/object';

import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import { axisBottom, axisLeft } from 'd3-axis';
import 'd3-transition';

const COLORS = {
  blue: [ '#bbdefb' , '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Component.extend({

  color: 'blue',
  data: [],
  'on-click': null,

  highlightedLabel: or('selectedLabel', 'hoveredLabel'),

  tooltipTarget: computed('didRenderChart', 'highlightedLabel', function() {
    return select(this.$('svg')[0]).selectAll('rect')
      .filter(data => data.label === this.get('highlightedLabel'))
      .node();
  }),

  didInsertElement() {
    let svg = select(this.$('svg')[0]);
    this.set('svg', svg);
    let {
      width,
      height
    } = this.get('svg').node().getBoundingClientRect();

    let padding = {
      top: 10,
      bottom: 30,
      left: 40,
      right: 0
    };
    this.set('barsContainer', svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
    );
    let barsHeight = height - padding.top - padding.bottom;
    this.set('barsHeight', barsHeight);
    let barsWidth = width - padding.left - padding.right;

    // Y scale & axes
    let yScale = scaleLinear().range([ 0, barsHeight ]);
    this.set('yScale', yScale);
    this.set('yAxis', axisLeft(yScale));
    this.set('yAxisContainer', svg.append('g')
      .attr('class', 'axis axis--y')
      .attr('transform', `translate(${padding.left}, ${padding.top})`)
    );

    // X scale & axes
    let xScale = scaleBand().range([ 0, barsWidth ]).paddingInner(0.12);
    this.set('xScale', xScale);
    this.set('xAxis', axisBottom(xScale));
    this.set('xAxisContainer', svg.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', `translate(${padding.left}, ${padding.top + barsHeight})`)
    );

    // Color scale
    this.set('colorScale', scaleLinear().range(COLORS[this.get('color')]));

    this.renderChart();
    this.set('didRenderChart', true);
  },

  didUpdateAttrs() {
    this.renderChart();
  },

  renderChart() {
    let data = this.get('data').sortBy('label');
    let counts = data.map(data => data.count);

    // Update the scales
    this.get('yScale').domain([ 0, Math.max(...counts) ]);
    this.get('colorScale').domain([ 0, Math.max(...counts) ]);
    this.get('xScale').domain(data.map(data => data.label));

    // Update the axes
    this.get('xAxis').scale(this.get('xScale'));
    this.get('xAxisContainer').call(this.get('xAxis'));
    this.get('yAxis').scale(this.get('yScale'));
    this.get('yAxisContainer').call(this.get('yAxis'));

    let barsUpdate = this.get('barsContainer').selectAll('rect').data(data, data => data.label);
    // Enter
    let barsEnter = barsUpdate.enter()
      .append('rect')
      .attr('opacity', 0);
    let barsExit = barsUpdate.exit();

    // Update
    let rafId;
    barsEnter
      .merge(barsUpdate)
      .transition()
      .attr('width', `${this.get('xScale').bandwidth()}px`)
      .attr('height', data => `${this.get('yScale')(data.count)}px`)
      .attr('x', data => `${this.get('xScale')(data.label)}px`)
      .attr('y', data => `${this.get('barsHeight') - this.get('yScale')(data.count)}px`)
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

    // Exit
    barsExit
      .transition()
      .attr('opacity', 0)
      .remove();

    // Events
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

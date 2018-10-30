/* global Tether */
import { computed } from '@ember/object';

import { or } from '@ember/object/computed';
import Component from '@ember/component';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import 'd3-transition';

const COLORS = {
  blue: [ '#bbdefb' , '#2196f3' ],
  green: [ '#c8e6c9', '#4caf50' ],
  red: [ '#ffcdd2', '#f44336' ]
};

export default Component.extend({

  color: 'blue',
  data: computed(function() {
    return [];
  }),
  'on-click': null,
  duration: 350,
  activeTransitions: 0,
  onAnimationStart() {},
  onAnimationEnd() {},

  highlightedLabel: or('selectedLabel', 'hoveredLabel'),

  tooltipTarget: computed('didRenderChart', 'highlightedLabel', function() {
    return select(this.$('svg')[0]).selectAll('rect')
      .filter(data => data.label === this.highlightedLabel)
      .node();
  }),

  didInsertElement() {
    this.set('yScale', scaleLinear().range([ 0, 100 ]));
    this.set('colorScale', scaleLinear().range(COLORS[this.color]));
    this.set('xScale', scaleBand().range([ 0, 100 ]).paddingInner(0.12));

    this.renderChart();
    this.set('didRenderChart', true);
  },

  didUpdateAttrs() {
    this.renderChart();
  },

  transitionDidStart() {
    if (!this.isDestroyed) {
      this.incrementProperty('activeTransitions');
    }
  },

  transitionDidEnd() {
    if (!this.isDestroyed) {
      this.decrementProperty('activeTransitions');

      if (this.activeTransitions === 0) {
        this.onAnimationEnd();
      }
    }
  },

  renderChart() {
    this.onAnimationStart();

    let data = this.data.sortBy('label');
    let counts = data.map(data => data.count);

    this.yScale.domain([ 0, Math.max(...counts) ]);
    this.colorScale.domain([ 0, Math.max(...counts) ]);
    this.xScale.domain(data.map(data => data.label));

    let svg = select(this.$('svg')[0]);
    let barsUpdate = svg.selectAll('rect').data(data, data => data.label);
    let barsEnter = barsUpdate.enter()
      .append('rect')
      .attr('opacity', 0);
    let barsExit = barsUpdate.exit();

    let rafId;
    barsEnter
      .merge(barsUpdate)
      .transition().duration(this.duration)
      .attr('width', `${this.xScale.bandwidth()}%`)
      .attr('height', data => `${this.yScale(data.count)}%`)
      .attr('x', data => `${this.xScale(data.label)}%`)
      .attr('y', data => `${100 - this.yScale(data.count)}%`)
      .attr('fill', data => this.colorScale(data.count))
      .attr('opacity', data => {
        let selected = this.selectedLabel;

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
      })
      .on('start.animationChange', () => this.transitionDidStart())
      .on('end.animationChange interrupt.animationChange', () => this.transitionDidEnd());

    barsExit
      .transition().duration(this.duration)
      .attr('opacity', 0)
      .remove()
      .on('start.animationChange', () => this.transitionDidStart())
      .on('end.animationChange interrupt.animationChange', () => this.transitionDidEnd());

    barsEnter
      .on('mouseover', data => {
        this.set('hoveredLabel', data.label);
      })
      .on('mouseout', () => {
        this.set('hoveredLabel', null);
      })
      .on('click', data => {
        let clickedLabel = data.label;

        if (this['on-click']) {
          this['on-click'](clickedLabel);
        } else {
          if (clickedLabel === this.selectedLabel) {
            this.set('selectedLabel', '');
          } else {
            this.set('selectedLabel', clickedLabel);
          }

          this.renderChart();
        }
      });
  }

});

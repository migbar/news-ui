/* global Tether requestAnimationFrame cancelAnimationFrame */
import Component from '@ember/component';
import layout from './template';
import { select } from 'd3-selection';
import { scaleLinear, scaleBand } from 'd3-scale';
import 'd3-transition';

import { computed } from '@ember/object';

const COLORS = {
  blue: ['#C5DFEC', '#296FAD'],
  red: ['#F5B396', '#C0383B'],
  green: ['#CCE9A7', '#579929'],
}

export default Component.extend({
  layout,
  didRenderChart: false,
  color: 'blue',

  highlightedLabel: computed.or('selectedLabel', 'hoveredLabel'),

  tooltipTarget: computed('highlightedLabel', 'didRenderChart', function() {

    // Make sure to call the 'highlightedLabel' CP
    let highlightedLabel = this.get('highlightedLabel');

    return select(this.$('svg')[0])
      .selectAll('rect')
      .filter(data => data.label === highlightedLabel)
      .node();
  }),

  init() {
    this._super(...arguments);
    this.data = [];
  },

  didInsertElement() {
    this.set('xScale', scaleBand().range([0, 100]).paddingInner(0.1));
    this.set('yScale', scaleLinear().range([0, 100]));
    this.set('colorScale', scaleLinear().range(COLORS[this.get('color')]));

    this.renderChart();
    this.set('didRenderChart', true);
  },

  didUpdateAttrs() {
    this.renderChart();
  },

  renderChart() {
    let data = this.get('data').sortBy('label');
    let counts = data.map(data => data.value);

    this.get('xScale').domain(data.map(data => data.label));
    this.get('yScale').domain([0, Math.max(...counts)]);
    this.get('colorScale').domain([0, Math.max(...counts)]);

    let svg = select(this.$('svg')[0]);
    let barsUpdate = svg.selectAll('rect').data(data, data => data.label);
    let barsEnter = barsUpdate.enter().append('rect').attr('opacity', 0);
    let barsExit = barsUpdate.exit();

    let rafId;
    barsEnter
      .merge(barsUpdate)
      .transition().duration(400)
      .attr('width', `${this.get('xScale').bandwidth()}%`)
      .attr('height', data => `${this.get('yScale')(data.value)}%`)
      .attr('fill', data => this.get('colorScale')(data.value))
      .attr('x', data => `${this.get('xScale')(data.label)}%`)
      .attr('y', data => `${100 - this.get('yScale')(data.value)}%`)
      .attr('opacity', data => {
        let selected = this.get('selectedLabel');
        return (selected && selected !== data.label) ? '0.5' : '1.0';
      })
      .on('start', (data, index) => {
        if (index === 0) {
          (function updateTether() {
            Tether.position();
            rafId = requestAnimationFrame(updateTether);
          })();
        }
      })
      .on('end interrupt', (data, index) => {
        if (index === 0) {
          cancelAnimationFrame(rafId);
        }
      })

    barsExit
      .transition().duration(400)
      .attr('opacity', 0)
      .remove('rect');

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

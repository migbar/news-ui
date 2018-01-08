import Component from '@ember/component';
import layout from './template';
import { task, timeout } from 'ember-concurrency';

import { select } from 'd3-selection';
// import { range } from 'd3-array';
import { scaleLinear /*scaleTime*/ } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
// import { axisBottom, axisLeft } from 'd3-axis';
import { easeLinear } from 'd3-ease';
// import 'd3-ease';
import 'd3-transition';

export default Component.extend({
  layout,
  width: 500,
  height: 200,

  max_interval: 500,
  step: 1,
  maxNumberOfDataPoints: 100,
  counter: 0,

  svg: null,
  xScale: null,
  yScale: null,
  path: null,
  smoothLine: null,

  dataGeneratorTask: task(function*() {
    while (true) {
      let currentInterval = (Math.random() * this.get('max_interval'));
      this.set('currentInterval', currentInterval);
      yield timeout(currentInterval);
      this.get('data').push(this.newPoint());

      if (this.get('data').length > this.get('maxNumberOfDataPoints')) {
        this.get('data').shift();
      }

    }
  }),

  newPoint() {
    return {
      x: this.get('counter'),
      y: ((Math.random() * 70) + (Math.random() * 25) >> 0) // y is a random value between 25 and 75
    };
  },

  init() {
    this._super(...arguments);
    this.data = [];
  },

  didInsertElement() {
    this._super(...arguments);

    this.set('svg', select(this.$('svg')[0])
      .attr('width', this.get('width'))
      .attr('height', this.get('height')));

    this.set('xScale', scaleLinear()
      .range([0, this.get('width')]));

    this.set('yScale', scaleLinear()
      .range([this.get('height'), 0])
      .domain([0, 100]));

    this.set('path', this.get('svg')
      .append('path').style('stroke', 'teal')
      .attr('fill', 'none'));

    this.set('smoothLine', line().curve(curveMonotoneX)
      .x(d => {
        let offset = Math.max(this.get('step') * 10, 10);
        return this.get('xScale')(d.x) + offset;
      })
      .y(d => this.get('yScale')(d.y)));

    this.get('dataGeneratorTask').perform();
    this.renderChart();
  },

  renderChart() {
    this.set('counter', this.get('counter') + this.get('step'));

    this.get('xScale').domain([this.get('counter') - (this.get('maxNumberOfDataPoints') - this.get('step')), this.get('counter')]);

    // Draw new line
    this.get('path').datum(this.get('data')).attr('d', this.get('smoothLine'));

    let pointsPainted = this.get('counter') - this.get('maxNumberOfDataPoints');
    let translateDistance = this.get('xScale')(pointsPainted);

    // Shift the chart left
    this.get('path')
      .attr('transform', null)
      .transition()
      .duration(this.get('currentInterval'))
      .ease(easeLinear)
      .attr('transform', 'translate(' + translateDistance + ')')
      .on('end', this.renderChart.bind(this));
  }

});

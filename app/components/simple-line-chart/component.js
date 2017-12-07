import Ember from 'ember';

import { task, timeout } from 'ember-concurrency';

import { select } from 'd3-selection';
import { range } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { easeLinear } from 'd3-ease';
// import 'd3-ease';
import 'd3-transition';

export default Ember.Component.extend({
  width: 500,
  height: 200,
  globalX: 0,
  data: [],
  max: 200,
  step: 2,

  svg: null,
  xScale: null,
  yScale: null,
  path: null,
  smoothLine: null,

  dataGeneratorTask: task(function * () {
    while (true) {
      // events come in at random intervals
      let interval = (Math.random() * 350) + 150;
      this.set('interval', interval);
      yield timeout(interval);
      this.get('data').push(this.newPoint());
    }
  }),

  newPoint() {
    return {
      x: this.get('globalX'),
      y: ((Math.random() * 70) + (Math.random() * 25) >> 0)  // y is a random value between 25 and 75
    };
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
                        .x(d => this.get('xScale')( d.x )+10)
                        .y(d => this.get('yScale')( d.y )));

    this.get('dataGeneratorTask').perform();
    this.renderChart();
  },

  renderChart() {
    this.set('globalX', this.get('globalX') + this.get('step'));

    this.get('xScale').domain([ this.get('globalX') - (this.get('max') - this.get('step')), this.get('globalX') ]);

    // Draw new line
    this.get('path').datum(this.get('data')).attr('d', this.get('smoothLine'));

    // Shift the chart left
    this.get('path')
      .attr('transform', null)
      .transition()
      .duration(this.get('interval'))
      .ease(easeLinear)
      .attr('transform', 'translate(' + this.get('xScale')(this.get('globalX') - this.get('max')) + ')')
      .on('end', this.renderChart.bind(this));

    // Remove old this.get('data') if more points than max
    if (this.get('data').length > this.get('max')) {
      this.get('data').shift();
    }
  }

});

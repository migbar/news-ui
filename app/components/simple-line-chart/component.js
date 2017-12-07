import Ember from 'ember';

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
  duration: 700,
  max: 200,
  step: 2,

  didInsertElement() {
    this._super(...arguments);
    this.set('xScale', scaleLinear().range([0, this.get('width')]));
    this.set('yScale', scaleLinear().range([this.get('height'), 0]).domain([0, 100]));

    this.renderChart();
  },

  renderChart() {
    let svg = select(this.$('svg')[0])
      .attr('width', this.get('width'))
      .attr('height', this.get('height'));

    let smoothLine = line().curve(curveMonotoneX)
      .x(d => this.get('xScale')( d.x )+10)
      .y(d => this.get('yScale')( d.y ));

    let path = svg
      .append('path')
      .style('stroke', 'teal')
      .attr('fill', 'none');

    this.set('smoothLine', smoothLine);
    this.set('path', path);

    this.tick();
  },

  newPoint() {
    console.log('once');
    let y = ((Math.random() * 70) + (Math.random() * 25) >> 0);  // y is a random value between 25 and 75
    let x = this.get('globalX');

    return { x, y };
  },

  tick() {
    console.log('here');
    this.get('data').push(this.newPoint());
    this.set('globalX', this.get('globalX') + this.get('step'));

    this.get('xScale').domain([ this.get('globalX') - (this.get('max') - this.get('step')), this.get('globalX') ]);

    // Draw new line
    this.get('path').datum(this.get('data')).attr('d', this.get('smoothLine'));

    // Shift the chart left
    this.get('path').attr('transform', null)
      .transition()
      .duration(this.get('duration'))
      .ease(easeLinear)
      .attr('transform', 'translate(' + this.get('xScale')(this.get('globalX') - this.get('max')) + ')')
      .on('end', this.tick.bind(this));

    // Remove old this.get('data') if more points than max
    if (this.get('data').length > this.get('max')) {
      this.get('data').shift();
    }
  }


});

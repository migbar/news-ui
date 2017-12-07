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

  didInsertElement() {
    let width = 500;
    let height = 200;
    let globalX = 0;
    let data = [];
    let duration = 700;
    let max = 200;
    let step = 2;
    let x = scaleLinear().range([0, width]);
    let y = scaleLinear().range([height, 0]).domain([0, 100]);

    let svg = select(this.$('svg')[0])
      .attr('width', width)
      .attr('height', height);

    let smoothLine = line().curve(curveMonotoneX)
      .x(d => x(d.x) + 10)
      .y(d => {
        return y(d.y)
      });

    let path = svg
      .append('path')
      .style('stroke', 'teal')
      .attr('fill', 'none');

    function newPoint() {
      let y = ((Math.random() * 70) + (Math.random() * 25) >> 0);  // y is a random value between 25 and 75
      let x = globalX;
      return { x, y };
    }

    function tick() {
      data.push(newPoint());
      globalX += step;

      x.domain([globalX - (max - step), globalX]);

      // Draw new line
      path.datum(data).attr('d', smoothLine);

      // Shift the chart left
      path.attr('transform', null)
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr('transform', 'translate(' + x(globalX - max) + ')')
        .on('end', tick)

      // Remove old data if more points than maximum
      if (data.length > max) data.shift();
    }

    tick();
  }
});

import Ember from 'ember';

import { select } from 'd3-selection';
import { range } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { curveMonotoneX, line } from 'd3-shape';
import { axisBottom /*axisLeft*/ } from 'd3-axis';
import { easeLinear } from 'd3-ease';
// import 'd3-ease';
import 'd3-transition';

export default Ember.Component.extend({

  // didInsertElement() {
  //   var margin = {top: 50, right: 50, bottom: 50, left: 50}
  //     , width = window.innerWidth - margin.left - margin.right // Use the window's width
  //     // , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  //     , height = window.innerHeight - margin.top - margin.bottom; // Use the window's height
  //
  //   // The number of datapoints
  //   var n = 21;
  //     let svg = select(this.$('svg')[0])
  //       .attr('width', width)
  //       .attr('height', height + 50);
  //
  //   // 5. X scale will use the index of our data
  //   var xScale = scaleLinear()
  //       .domain([0, n-1]) // input
  //       .range([0, width]); // output
  //
  //   // 6. Y scale will use the randomly generate number
  //   var yScale = scaleLinear()
  //       .domain([0, 1]) // input
  //       .range([height, 0]); // output
  //
  //   // 7. d3's line generator
  //   var daLine = line()
  //       .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
  //       .y(function(d) { return yScale(d.y); }) // set the y values for the line generator
  //       .curve(curveMonotoneX) // apply smoothing to the line
  //
  //
  //   // 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
  //   var dataset = range(n).map(function(d) { return {"y": Math.random() } })
  //
  //   // 1. Add the SVG to the page and employ #2
  //   // var svg = select("body").append("svg")
  //   //     .attr("width", width + margin.left + margin.right)
  //   //     .attr("height", height + margin.top + margin.bottom)
  //   //   .append("g")
  //   //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  //
  //   // 3. Call the x axis in a group tag
  //   svg.append("g")
  //       .attr("class", "x axis")
  //       .attr("transform", "translate(0," + height + ")")
  //       .call(axisBottom(xScale)); // Create an axis component with d3.axisBottom
  //
  //   // 4. Call the y axis in a group tag
  //   svg.append("g")
  //       .attr("class", "y axis")
  //       .call(axisLeft(yScale)); // Create an axis component with d3.axisLeft
  //
  //   // 9. Append the path, bind the data, and call the line generator
  //   svg.append("path")
  //       .datum(dataset) // 10. Binds data to the line
  //       .attr("class", "line") // Assign a class for styling
  //       .attr('fill', 'none')
  //       .attr('stroke', 'orange')
  //       .attr("d", daLine); // 11. Calls the line generator
  //
  //   // 12. Appends a circle for each datapoint
  //   svg.selectAll(".dot")
  //       .data(dataset)
  //     .enter().append("circle") // Uses the enter().append() method
  //       .attr("class", "dot") // Assign a class for styling
  //       .attr("cx", function(d, i) { return xScale(i) })
  //       .attr("cy", function(d) { return yScale(d.y) })
  //       .attr("r", 5);
  // },

  didInsertElement() {
    let limit = 60 * 1,
      duration = 1000,
      now = new Date(Date.now() - duration);

    let width = 500,
        height = 200

    let groups = {

      current: {
        value: 0,
        color: 'teal',
        data: range(limit).map(() => 0)
      },

      target: {
        value: 0,
        color: 'purple',
        data: range(limit).map(() => 0)
      },

      output: {
        value: 0,
        color: 'orange',
        data: range(limit).map(() => 0)
      }
    }

    let svg = select(this.$('svg')[0])
      .attr('width', width)
      .attr('height', height + 50);

    let x = scaleTime()
      .domain([now - (limit - 1), now - duration])
      .range([0, width])

    let y = scaleLinear()
      .domain([0, 100])
      .range([height, 0])

    let daLine = line()
      .x((d, i) => x(now - (limit - 1 - i) * duration))
      .y((d) => y(d))
      .curve(curveMonotoneX)

    let axis = svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(x.axis = axisBottom().scale(x));

    let paths = svg.append('g');

    for (let name in groups) {
      let group = groups[name];
      group.path = paths
        .append('path')
        .data([group.data])
        .style('stroke', group.color)
        .attr('fill', 'none');
    }

    function tick() {
      now = new Date()

      // Add new values
      for (let name in groups) {
        let group = groups[name]
        group.data.push(40 + Math.random() * 50);
        group.path.attr('d', daLine);


      }

      // Shift domain
      x.domain([now - (limit - 2) * duration, now - duration]);

      // Slide x-axis left
      axis.transition()
        .duration(duration)
        .ease(easeLinear)
        .call(x.axis);

      // Slide paths left
      paths
        .attr('transform', null)
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
        .on('end', tick);

      // Remove oldest data point from each group
      for (let name in groups) {
        let group = groups[name];
        group.data.shift();
      }
    }

    tick();
  }
});

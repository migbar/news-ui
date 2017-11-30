import Ember from 'ember';

import { select } from 'd3-selection';
import { extent, range } from 'd3-array';
import { scaleLinear, scaleTime } from 'd3-scale';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';
import { timeParse } from 'd3-time-format';
import { tsvParse } from 'd3-dsv';

var SAMPLE_DATA =[
  {date: '24-Apr-07', close:	93.24},
  {date: '25-Apr-07', close:	95.35},
  {date: '26-Apr-07', close:	98.84},
  {date: '27-Apr-07', close:	99.92},
  {date: '30-Apr-07', close:	99.80},
  {date: '1-May-07', close:	99.47},
  {date: '2-May-07', close:	100.39},
  {date: '3-May-07', close:	100.40},
  {date: '4-May-07', close:	100.81},
  {date: '7-May-07', close:	103.92},
  {date: '8-May-07', close:	105.06},
  {date: '9-May-07', close:	106.88},
  {date: '10-May-07', close:	107.34},
  {date: '11-May-07', close:	108.74},
  {date: '14-May-07', close:	109.36},
  {date: '15-May-07', close:	107.52},
  {date: '16-May-07', close:	107.34},
  {date: '17-May-07', close:	109.44},
  {date: '18-May-07', close:	110.02},
  {date: '21-May-07', close:	111.98},
  {date: '22-May-07', close:	113.54},
  {date: '23-May-07', close:	112.89},
  {date: '24-May-07', close:	110.69},
  {date: '25-May-07', close:	113.62},
  {date: '29-May-07', close:	114.35},
  {date: '30-May-07', close:	118.77},
  {date: '31-May-07', close:	121.19},
  {date: '1-Jun-07', close:	118.40},
  {date: '4-Jun-07', close:	121.33},
  {date: '5-Jun-07', close:	122.67},
  {date: '6-Jun-07', close:	123.64},
  {date: '7-Jun-07', close:	124.07},
  {date: '8-Jun-07', close:	124.49},
  {date: '11-Jun-07', close:	120.19},
  {date: '12-Jun-07', close:	120.38},
  {date: '13-Jun-07', close:	117.50},
  {date: '14-Jun-07', close:	118.75},
  {date: '15-Jun-07', close:	120.50},
  {date: '18-Jun-07', close:	125.09},
  {date: '19-Jun-07', close:	123.66},
  {date: '20-Jun-07', close:	121.55},
  {date: '21-Jun-07', close:	123.90},
  {date: '22-Jun-07', close:	123.00},
  {date: '25-Jun-07', close:	122.34},
  {date: '26-Jun-07', close:	119.65},
  {date: '27-Jun-07', close:	121.89},
  {date: '28-Jun-07', close:	120.56},
  {date: '29-Jun-07', close:	122.04},
  {date: '2-Jul-07', close:	121.26},
  {date: '3-Jul-07', close:	127.17},
  {date: '5-Jul-07', close:	132.75},
  {date: '6-Jul-07', close:	132.30},
  {date: '9-Jul-07', close:	130.33},
  {date: '10-Jul-07', close:	132.35},
  {date: '11-Jul-07', close:	132.39},
  {date: '12-Jul-07', close:	134.07},
  {date: '13-Jul-07', close:	137.73},
  {date: '16-Jul-07', close:	138.10},
  {date: '17-Jul-07', close:	138.91},
  {date: '18-Jul-07', close:	138.12},
  {date: '19-Jul-07', close:	140.00},
  {date: '20-Jul-07', close:	143.75},
  {date: '23-Jul-07', close:	143.70},
  {date: '24-Jul-07', close:	134.89},
  {date: '25-Jul-07', close:	137.26},
  {date: '26-Jul-07', close:	146.00},
  {date: '27-Jul-07', close:	143.85},
  {date: '30-Jul-07', close:	141.43},
  {date: '31-Jul-07', close:	131.76},
  {date: '1-Aug-07', close:	135.00},
  {date: '2-Aug-07', close:	136.49},
  {date: '3-Aug-07', close:	131.85},
  {date: '6-Aug-07', close:	135.25},
  {date: '7-Aug-07', close:	135.03},
  {date: '8-Aug-07', close:	134.01},
  {date: '9-Aug-07', close:	126.39},
  {date: '10-Aug-07', close:	125.00},
  {date: '13-Aug-07', close:	127.79},
  {date: '14-Aug-07', close:	124.03},
  {date: '15-Aug-07', close:	119.90},
  {date: '16-Aug-07', close:	117.05},
  {date: '17-Aug-07', close:	122.06},
  {date: '20-Aug-07', close:	122.22},
  {date: '21-Aug-07', close:	127.57},
  {date: '22-Aug-07', close:	132.51},
  {date: '23-Aug-07', close:	131.07},
  {date: '24-Aug-07', close:	135.30},
  {date: '27-Aug-07', close:	132.25},
  {date: '28-Aug-07', close:	126.82},
  {date: '29-Aug-07', close:	134.08},
  {date: '30-Aug-07', close:	136.25},
  {date: '31-Aug-07', close:	138.48},
  {date: '4-Sep-07', close:	144.16},
  {date: '5-Sep-07', close:	136.76},
  {date: '6-Sep-07', close:	135.01},
  {date: '7-Sep-07', close:	131.77},
  {date: '10-Sep-07', close:	136.71},
  {date: '11-Sep-07', close:	135.49},
  {date: '12-Sep-07', close:	136.85},
  {date: '13-Sep-07', close:	137.20},
  {date: '14-Sep-07', close:	138.81},
  {date: '17-Sep-07', close:	138.41},
  {date: '18-Sep-07', close:	140.92},
  {date: '19-Sep-07', close:	140.77},
  {date: '20-Sep-07', close:	140.31},
  {date: '21-Sep-07', close:	144.15},
  {date: '24-Sep-07', close:	148.28},
  {date: '25-Sep-07', close:	153.18},
  {date: '26-Sep-07', close:	152.77},
  {date: '27-Sep-07', close:	154.50},
  {date: '28-Sep-07', close:	153.47},
  {date: '1-Oct-07', close:	156.34},
  {date: '2-Oct-07', close:	158.45},
  {date: '3-Oct-07', close:	157.92},
  {date: '4-Oct-07', close:	156.24},
  {date: '5-Oct-07', close:	161.45},
  {date: '8-Oct-07', close:	167.91},
  {date: '9-Oct-07', close:	167.86},
  {date: '10-Oct-07', close:	166.79},
  {date: '11-Oct-07', close:	162.23},
  {date: '12-Oct-07', close:	167.25},
  {date: '15-Oct-07', close:	166.98},
  {date: '16-Oct-07', close:	169.58},
  {date: '17-Oct-07', close:	172.75},
  {date: '18-Oct-07', close:	173.50},
  {date: '19-Oct-07', close:	170.42},
  {date: '22-Oct-07', close:	174.36},
  {date: '23-Oct-07', close:	186.16},
  {date: '24-Oct-07', close:	185.93},
  {date: '25-Oct-07', close:	182.78},
  {date: '26-Oct-07', close:	184.70},
  {date: '29-Oct-07', close:	185.09},
  {date: '30-Oct-07', close:	187.00},
  {date: '31-Oct-07', close:	189.95},
  {date: '1-Nov-07', close:	187.44},
  {date: '2-Nov-07', close:	187.87},
  {date: '5-Nov-07', close:	186.18},
  {date: '6-Nov-07', close:	191.79},
  {date: '7-Nov-07', close:	186.30},
  {date: '8-Nov-07', close:	175.47},
  {date: '9-Nov-07', close:	165.37},
  {date: '12-Nov-07', close:	153.76},
  {date: '13-Nov-07', close:	169.96},
  {date: '14-Nov-07', close:	166.11},
  {date: '15-Nov-07', close:	164.30},
  {date: '16-Nov-07', close:	166.39},
  {date: '19-Nov-07', close:	163.95},
  {date: '20-Nov-07', close:	168.85},
  {date: '21-Nov-07', close:	168.46},
  {date: '23-Nov-07', close:	171.54},
  {date: '26-Nov-07', close:	172.54},
  {date: '27-Nov-07', close:	174.81},
  {date: '28-Nov-07', close:	180.22},
  {date: '29-Nov-07', close:	184.29},
  {date: '30-Nov-07', close:	182.22},
  {date: '3-Dec-07', close:	178.86},
  {date: '4-Dec-07', close:	179.81},
  {date: '5-Dec-07', close:	185.50},
  {date: '6-Dec-07', close:	189.95},
  {date: '7-Dec-07', close:	194.30},
  {date: '10-Dec-07', close:	194.21},
  {date: '11-Dec-07', close:	188.54},
  {date: '12-Dec-07', close:	190.86},
  {date: '13-Dec-07', close:	191.83},
  {date: '14-Dec-07', close:	190.39},
  {date: '17-Dec-07', close:	184.40},
  {date: '18-Dec-07', close:	182.98},
  {date: '19-Dec-07', close:	183.12},
  {date: '20-Dec-07', close:	187.21},
  {date: '21-Dec-07', close:	193.91},
  {date: '24-Dec-07', close:	198.80},
  {date: '26-Dec-07', close:	198.95},
  {date: '27-Dec-07', close:	198.57},
  {date: '28-Dec-07', close:	199.83},
  {date: '31-Dec-07', close:	198.08},
  {date: '2-Jan-08', close:	194.84},
  {date: '3-Jan-08', close:	194.93},
  {date: '4-Jan-08', close:	180.05},
  {date: '7-Jan-08', close:	177.64},
  {date: '8-Jan-08', close:	171.25},
  {date: '9-Jan-08', close:	179.40},
  {date: '10-Jan-08', close:	178.02},
  {date: '11-Jan-08', close:	172.69},
  {date: '14-Jan-08', close:	178.78},
  {date: '15-Jan-08', close:	169.04},
  {date: '16-Jan-08', close:	159.64},
  {date: '17-Jan-08', close:	160.89},
  {date: '18-Jan-08', close:	161.36},
  {date: '22-Jan-08', close:	155.64},
  {date: '23-Jan-08', close:	139.07},
  {date: '24-Jan-08', close:	135.60},
  {date: '25-Jan-08', close:	130.01},
  {date: '28-Jan-08', close:	130.01},
  {date: '29-Jan-08', close:	131.54},
  {date: '30-Jan-08', close:	132.18},
  {date: '31-Jan-08', close:	135.36},
  {date: '1-Feb-08', close:	133.75},
  {date: '4-Feb-08', close:	131.65},
  {date: '5-Feb-08', close:	129.36},
  {date: '6-Feb-08', close:	122.00},
  {date: '7-Feb-08', close:	121.24},
  {date: '8-Feb-08', close:	125.48},
  {date: '11-Feb-08', close:	129.45},
  {date: '12-Feb-08', close:	124.86},
  {date: '13-Feb-08', close:	129.40},
  {date: '14-Feb-08', close:	127.46},
  {date: '15-Feb-08', close:	124.63},
  {date: '19-Feb-08', close:	122.18},
  {date: '20-Feb-08', close:	123.82},
  {date: '21-Feb-08', close:	121.54},
  {date: '22-Feb-08', close:	119.46},
  {date: '25-Feb-08', close:	119.74},
  {date: '26-Feb-08', close:	119.15},
  {date: '27-Feb-08', close:	122.96},
  {date: '28-Feb-08', close:	129.91},
  {date: '29-Feb-08', close:	125.02},
  {date: '3-Mar-08', close:	121.73},
  {date: '4-Mar-08', close:	124.62},
  {date: '5-Mar-08', close:	124.49},
  {date: '6-Mar-08', close:	120.93},
  {date: '7-Mar-08', close:	122.25},
  {date: '10-Mar-08', close:	119.69},
  {date: '11-Mar-08', close:	127.35}
];

export default Ember.Component.extend({

  didInsertElement() {
    let svg = select(this.$('svg')[0]);
    svg
      .attr('width', '100%')
      .attr('height', '100%');

    let parseTime = timeParse("%d-%b-%y");
    let x = scaleTime().rangeRound([0, 700]);
    let y = scaleLinear().rangeRound([150, 0]);
    let l = line()
        .x(d => x(d.date))
        .y(d => y(d.close))

    let data = SAMPLE_DATA.map(function(e) {
      return {
        date: parseTime(e.date),
        close: e.close
      }
    });

    x.domain(extent(data, d => d.date));
    y.domain(extent(data, d => d.close));

    svg
    .append("svg")
      .attr('y', '100%')
    .append("g")
      .call(axisBottom(x))
      .select(".domain")
      .remove();

    svg.append("g")
      .call(axisLeft(y))
      .append("text")
        .attr("fill", "steelblue")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "1.0em")
        .attr("text-anchor", "end")
        .text("Price ($)");

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5)
      .attr("d", l);

  }
});

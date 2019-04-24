const Highcharts = require("highcharts");
const PubSub = require("../../helpers/pub_sub.js");

const LineGraph = function(parent, crime) {
  this.chart = Highcharts.chart(parent, {
    title: {
      text: "Reports 12 months from recent data"
    },
    yAxis: {
      title: {
        text: "Reports"
      }
    },
    xAxis: {
      categories: []
    },
    plotOptions: {
      series: {
        allowPointSelect: true
      }
    },
    series: [
      {
        name: crime.category,
        data: []
      }
    ]
  });
};

LineGraph.prototype.getMonths = function(data) {
  const dates = [];
  for (let collection of data.data[0]) {
    if (collection.length > 0) dates.push(collection[0].month);
  }
  return dates.reverse();
};

LineGraph.prototype.getCrimeCounts = function(data) {
  const counts = [];
  for (let collection of data.data[0]) {
    counts.push(collection.length);
  }
  counts.shift(5, counts.length);
  return counts.reverse();
};

LineGraph.prototype.setData = function(data) {
  const months = this.getMonths(data);
  const crimeCounts = this.getCrimeCounts(data);
  this.chart.xAxis[0].setCategories(months, false);
  this.chart.series[0].setData(crimeCounts, true, true, true);
};

module.exports = LineGraph;

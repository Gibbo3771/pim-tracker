const Highcharts = require("highcharts");
const PubSub = require("../../helpers/pub_sub.js");

const PieChart = function() {
  this.chart = Highcharts.chart("high-chart", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: { text: null },
    tooltip: {
      enabled: false
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.2f} %",
          style: {
            color:
              (Highcharts.theme && Highcharts.theme.contrastTextColor) ||
              "black",
            fontSize: "18px"
          }
        }
      }
    },
    series: [
      {
        type: "pie",
        name: "Category",
        innerSize: "40%",
        data: []
      }
    ]
  });
};

PieChart.prototype.bindEvents = function() {
  PubSub.subscribe("CategorisedCrime:refined-crime-data", evt => {
    this.setData(evt.detail);
  });
};

PieChart.prototype.setData = function(data) {
  this.chart.series[0].setData(data, true, true);
};

module.exports = PieChart;

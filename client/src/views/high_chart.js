const Highcharts = require("highcharts");
const PubSub = require("../helpers/pub_sub.js");

const Chart = function() {
  this.chart = Highcharts.chart("high-chart", {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: "Browser<br>shares<br>2017",
      align: "center",
      verticalAlign: "middle",
      y: 40
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          distance: -50,
          style: {
            fontWeight: "bold",
            color: "white"
          }
        },
        center: ["50%", "75%"],
        size: "110%"
      }
    },
    series: [
      {
        type: "pie",
        name: "Category",
        innerSize: "50%",
        data: []
      }
    ]
  });
};

Chart.prototype.bindEvents = function() {
  PubSub.subscribe("CategorisedCrime:refined-crime-data", evt => {
    this.setData(evt.detail);
  });
};

Chart.prototype.setData = function(data) {
  this.chart.series[0].setData(data, true, true);
};

module.exports = Chart;

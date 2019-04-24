const Modal = require("./modal/modal_view");
const LineGraph = require("./high_chart/line_graph");
const PubSub = require("./../helpers/pub_sub");

const CrimeDetailView = function(crime) {
  this.crime = crime;
  this.container = document.createElement("div");
  this.chartContainer = document.createElement("div");
  this.modal = null;
  this.graph = null;
  this.graphData = {
    name: this.crime.category,
    data: []
  };
  console.log("crime detail view", crime);
};

CrimeDetailView.prototype.render = function() {
  this.chartContainer.id = "line-chart";
  this.container.appendChild(this.chartContainer);
  this.container.classList.add("crime-detail-view");
  this.modal = new Modal("0.6", this.container, true, () =>
    this.onCrimeDetailModalOpen()
  );
  this.modal.render().center();
  this.graph = new LineGraph("line-chart", this.crime);
};

CrimeDetailView.prototype.createTextElement = function(
  text,
  klass = "",
  prefix = "",
  suffix = ""
) {
  const div = document.createElement("div");
  const e = document.createElement("p");
  div.appendChild(e);
  div.classList.add(klass);
  e.textContent = `${prefix} ${text} ${suffix}`;
  return div;
};

CrimeDetailView.prototype.onCrimeDetailModalOpen = function() {
  PubSub.publish("CrimeDetailView:modal-open", this.crime);
  PubSub.subscribe("App:monthly-data-stream", evt => {
    this.graphData.data.push(evt.detail);
    this.graph.setData(this.graphData);
  });
};

module.exports = CrimeDetailView;

const PubSub = require("../helpers/pub_sub.js");
const CrimeItemView = require("./crime_item_view.js");

const CrimeListView = function(crimeListElement) {
  this.element = crimeListElement;
};

CrimeListView.prototype.render = function(items) {
  this.element.innerHTML = "";
  const div = document.createElement("div");
  const crimeListView = new CrimeItemView(this.container);
  items.forEach(item => {
    crimeListView.render(item);
  });
};

module.exports = CrimeListView;

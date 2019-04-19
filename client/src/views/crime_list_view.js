const PubSub = require("../helpers/pub_sub.js");
const CrimeItemView = require("./crime_item_view.js");

const CrimeListView = function(crimes) {
  this.crimes = crimes;
};

CrimeListView.prototype.render = function() {
  const crimeListView = document.createElement("div");
  this.crimes.forEach(crime => {
    const crimeItemView = new CrimeItemView(crime);
    crimeItemView.render();
  });
};

module.exports = CrimeListView;

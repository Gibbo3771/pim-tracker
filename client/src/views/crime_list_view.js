const PubSub = require("../helpers/pub_sub.js");
const CrimeItemView = require("./crime_item_view.js");
const Crime = require("../models/crime.js");

const CrimeListView = function() {
  this.crimes = [];
};

CrimeListView.prototype.render = function() {
  this.crimes.forEach(crimeItemView => {
    crimeItemView.render();
  });
};

CrimeListView.prototype.populate = function(evt) {
  this.clear();
  const crimeData = evt.detail;
  for (crime of crimeData) {
    this.crimes.push(new CrimeItemView(new Crime(crime)));
  }
  this.render();
};

CrimeListView.prototype.clear = function() {
  document.querySelector("#information").innerHTML = "";
  this.crimes = [];
};

CrimeListView.prototype.bindEvents = function() {
  PubSub.subscribe("App:top-10-crime", evt => {
    this.populate(evt);
  });
};

module.exports = CrimeListView;

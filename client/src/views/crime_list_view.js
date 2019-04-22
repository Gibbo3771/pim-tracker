const PubSub = require("../helpers/pub_sub.js");
const CrimeItemView = require("./crime_item_view.js");
const Crime = require("../models/crime.js");

const CrimeListView = function() {
  this.crimes = [];
};

CrimeListView.prototype.render = function() {
  console.log(document.querySelector("#information").innerHTML);
  if (this.crimes.length === 0) return;
  this.crimes.forEach(crime => {
    const crimeItemView = new CrimeItemView(crime);
    crimeItemView.render();
  });
};

CrimeListView.prototype.populate = function(evt) {
  const crimeData = evt.detail;
  for (crime of crimeData) {
    this.crimes.push(new Crime(crime));
  }
  this.render();
};

CrimeListView.prototype.bindEvents = function() {
  PubSub.subscribe("App:top-10-crime", evt => {
    this.populate(evt);
  });
};

module.exports = CrimeListView;

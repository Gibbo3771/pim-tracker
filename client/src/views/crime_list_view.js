const PubSub = require("../helpers/pub_sub.js");
const CrimeItemView = require("./crime_item_view.js");
const Crime = require("../models/crime.js");

const CrimeListView = function() {
  this.crimes = [];
};

CrimeListView.prototype.render = function() {
  const headers = new CrimeItemView({
    category: "Category",
    streetName: "Approximate Location",
    date: "Year/Month"
  });
  headers.render();
  this.crimes.forEach(crimeItemView => {
    crimeItemView.render();
  });
};

CrimeListView.prototype.populate = function(evt) {
  this.clear();
  const crimeData = evt.detail;
  for (let crime of crimeData) {
    this.crimes.push(new CrimeItemView(new Crime(crime)));
  }
  this.render();
};

CrimeListView.prototype.clear = function() {
  document.querySelector("#information").innerHTML = "";
  document.querySelector("#number").innerHTML = "";
  document.querySelector("#latest-10").innerHTML = "";
  this.crimes = [];
};

CrimeListView.prototype.bindEvents = function() {
  PubSub.subscribe("App:top-10-crime", evt => {
    this.populate(evt);
  });
  PubSub.subscribe("App:total-number-of-crime-array", evt => {
    this.populate(evt);
  });
  PubSub.subscribe("App:number-of-crime", evt => {
    this.getNumberOfCrimes(evt);
    this.latestCrimes(evt);
  });
};

CrimeListView.prototype.getNumberOfCrimes = function(evt) {
  const container = document.querySelector("#number");
  container.textContent = `Total Number of Crimes in this Area: ${evt.detail}`;
};

CrimeListView.prototype.latestCrimes = function(evt) {
  let num = evt.detail;
  if (num > 10) {
    num = 10;
  }
  const container = document.querySelector("#latest-10");
  container.textContent = `Latest ${num} Crimes`;
};
module.exports = CrimeListView;

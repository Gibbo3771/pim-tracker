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
  PubSub.subscribe("App:data-overload", () => {
    this.overload();
  });
};

CrimeListView.prototype.getNumberOfCrimes = function(evt) {
  const container = document.querySelector("#number");
  container.textContent = `Total Number Of Crimes In This Area: ${evt.detail}`;
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

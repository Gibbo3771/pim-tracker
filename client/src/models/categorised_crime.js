const PubSub = require("../helpers/pub_sub.js");
const Crime = require("../models/crime.js");
const RequestHelper = require("../helpers/request_helper.js");

const CategorisedCrime = function() {
  this.antiSoc = [];
  this.bicycleTheft = [];
  this.burglary = [];
  this.criminalDamageArson = [];
  this.drugs = [];
  this.otherTheft = [];
  this.weapons = [];
  this.publicOrder = [];
  this.robbery = [];
  this.shoplifting = [];
  this.theftFromPerson = [];
  this.vehicleCrime = [];
  this.violentCrime = [];
  this.otherCrime = [];
};

CategorisedCrime.prototype.bindEvents = function() {
  PubSub.subscribe("App:all-crime", evt => {
    this.filterByCategory(evt);
  });
};

CategorisedCrime.prototype.get = function() {
  const rq = new RequestHelper();
  rq.getCrimeInRectangle()
    .then(res => {
      this.filterByCategory(res);
    })
    .catch(err => {
      console.log(err);
    });
};

CategorisedCrime.prototype.filterByCategory = function(res) {
  this.clear();
  for (crimeData of res.detail) {
    switch (crimeData.category) {
      case "anti-social-behaviour":
        this.antiSoc.push(new Crime(crimeData));
        break;
      case "bicycle-theft":
        this.bicycleTheft.push(new Crime(crimeData));
        break;
      case "burglary":
        this.burglary.push(new Crime(crimeData));
        break;
      case "criminal-damage-arson":
        this.criminalDamageArson.push(new Crime(crimeData));
        break;
      case "drugs":
        this.drugs.push(new Crime(crimeData));
        break;
      case "other-theft":
        this.otherTheft.push(new Crime(crimeData));
        break;
      case "possession-of-weapons":
        this.weapons.push(new Crime(crimeData));
        break;
      case "public-order":
        this.publicOrder.push(new Crime(crimeData));
        break;
      case "robbery":
        this.robbery.push(new Crime(crimeData));
        break;
      case "shoplifting":
        this.shoplifting.push(new Crime(crimeData));
        break;
      case "theft-from-the-person":
        this.theftFromPerson.push(new Crime(crimeData));
        break;
      case "vehicle-crime":
        this.vehicleCrime.push(new Crime(crimeData));
        break;
      case "violent-crime":
        this.violentCrime.push(new Crime(crimeData));
        break;
      case "other-crime":
        this.otherCrime.push(new Crime(crimeData));
        break;
    }
  }
  this.getPercentageOf();
};

CategorisedCrime.prototype.getPercentageOf = function(array) {
  Object.keys(this).forEach(prop => {});
  console.log(this.totalCrime());
};

CategorisedCrime.prototype.clear = function() {
  Object.keys(this).forEach(prop => {
    this[prop] = [];
  });
};

CategorisedCrime.prototype.totalCrime = function() {
  let acc = 0;
  Object.keys(this).forEach(prop => {
    acc += this[prop].length;
  });
  return acc;
};

module.exports = CategorisedCrime;

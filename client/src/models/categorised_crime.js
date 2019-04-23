const PubSub = require("../helpers/pub_sub.js");
const RequestHelper = require("../models/request_helper.js");

const CategorisedCrime = function() {
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
  switch ()
};

module.exports = CategorisedCrime;

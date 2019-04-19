const PubSub = require("../helpers/pub_sub.js");

const Crime = function(params) {
  this.category = params.category;
  this.streetName = params.location.street.name;
  this.month = params.month;
  this.lat = params.location.latitude;
  this.lng = params.location.longitude;
};

module.exports = Crime;

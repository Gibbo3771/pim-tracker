const PubSub = require("../helpers/pub_sub.js");

const Crime = function(params) {
  this.category = params.category;
  this.streetName = params.location.street.name;
  this.date = params.month;
  this.lat = params.location.latitude;
  this.lng = params.location.longitude;
  this.outcome =
    (params.outcome === null
      ? {
          category: params.outcome_status.category,
          date: params.outcome_status.date
        }
      : {
          category: "No information on outcome",
          date: "N/A"
        };)
};

module.exports = Crime;

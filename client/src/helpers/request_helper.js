const queryString = require("querystring");

const RequestHelper = function(url) {
  this.url = url;
};

RequestHelper.prototype.getCrimesAtLocation = function(
  date,
  lat,
  long,
  radius
) {
  const params = {
    date: date,
    lat: lat,
    lng: long
  };

  return fetch(this.createUrl(params))
    .then(response => response.json())
    .catch(err => console.error(err));
};

RequestHelper.prototype.createUrl = function(params) {
  return `${this.url}?${queryString.stringify(params)}`;
};

module.exports = RequestHelper;

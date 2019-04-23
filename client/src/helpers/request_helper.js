const queryString = require("querystring");

const RequestHelper = function() {
  this.url = null;
};

RequestHelper.prototype.get = function() {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.error(err));
};

RequestHelper.prototype.getCrimeAtLocation = function(date, lat, long) {
  const params = {
    date: date,
    lat: lat,
    long: long
  };

  return this.request(params);
};

RequestHelper.prototype.getCrimeInRectangle = function(
  lat1,
  lng1,
  lat2,
  lng2,
  lat3,
  lng3,
  lat4,
  lng4,
  date = new Date()
) {
  console.log("date", date);
  this.url = "https://data.police.uk/api/crimes-street/all-crime";
  const params = {
    date: `${date.getFullYear()}-${date.getMonth()}`,
    poly: `${lat1},${lng1}:${lat2},${lng2}:${lat3},${lng3}:${lat4},${lng4}`
  };

  return this.request(params);
};

RequestHelper.prototype.request = function(params) {
  return fetch(this.createUrl(params))
    .then(response => response.json())
    .catch(() => {});
};

RequestHelper.prototype.createUrl = function(params) {
  return decodeURIComponent(`${this.url}?${queryString.stringify(params)}`);
};

module.exports = RequestHelper;

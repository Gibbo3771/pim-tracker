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
  rectangle,
  category = "all-crime",
  date = new Date("2019-03")
) {
  const { latlng1, latlng2, latlng3, latlng4 } = rectangle;
  this.url = "https://data.police.uk/api/crimes-street/all-crime";
  const params = {
    category: category,
    date: `${date.getFullYear()}-${date.getMonth()}`,
    poly: `${latlng1.lat},${latlng1.lng}:${latlng2.lat},${latlng2.lng}:${
      latlng3.lat
    },${latlng3.lng}:${latlng4.lat},${latlng4.lng}`
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

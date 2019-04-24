const queryString = require("querystring");

const RequestHelper = function() {
  this.url = null;
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
  date = new Date(),
  category = "all-crime"
) {
  const { latlng1, latlng2, latlng3, latlng4 } = rectangle;
  this.url = "https://data.police.uk/api/crimes-street/all-crime";
  const params = {
    category: category,
    date: `${date.getFullYear()}-${date.getMonth() + 1}`,
    poly: `${latlng1.lat},${latlng1.lng}:${latlng2.lat},${latlng2.lng}:${
      latlng3.lat
    },${latlng3.lng}:${latlng4.lat},${latlng4.lng}`
  };

  return this.request(params);
};

RequestHelper.prototype.getCrimeOverMonths = function(
  rectangle,
  category,
  listOfDates
) {
  const urls = [];
  const { latlng1, latlng2, latlng3, latlng4 } = rectangle;
  this.url = "https://data.police.uk/api/crimes-street/all-crime";
  for (let date of listOfDates) {
    const params = {
      poly: `${latlng1.lat},${latlng1.lng}:${latlng2.lat},${latlng2.lng}:${
        latlng3.lat
      },${latlng3.lng}:${latlng4.lat},${latlng4.lng}`,
      category: category,
      date: `${date.getFullYear()}-${date.getMonth() + 1}`
    };
    urls.push(this.createUrl(params));
  }
  return Promise.all(
    urls.map(function(url) {
      return fetch(url).then(res => res.json());
    })
  );
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

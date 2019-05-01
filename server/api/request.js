const Request = function() {};

Request.prototype.getCrimeInRectangle = function(
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

Request.prototype.request = function(params) {
  return fetch(this.createUrl(params))
    .then(response => response.json())
    .catch(() => {});
};

Request.prototype.createUrl = function(params) {
  return decodeURIComponent(`${this.url}?${queryString.stringify(params)}`);
};

module.exports = Request;

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

RequestHelper.prototype.getAnnualCrimeInRectangle = function(
  rectangle,
  category = "all-crime",
  date = new Date()
) {
  const { latlng1, latlng2, latlng3, latlng4 } = rectangle;
  this.url = "https://data.police.uk/api/crimes-street/all-crime";

  year2018 = date.getFullYear() - 1;
  year2019 = date.getFullYear();

  twoYears = [year2018, year2019];
  console.log(twoYears);

  months2018 = [];
  for (let month = 3; month < 13; month++) {
    months2018.push(month);
  }
  months2019 = [];
  for (let month = 1; month < 3; month++) {
    months2019.push(month);
  }

  console.log(months2018);
  console.log(months2019);

  yearlyData = [
    "2018-02",
    "2018-03",
    "2018-04",
    "2018-05",
    "2018-06",
    "2018-07",
    "2018-08",
    "2018-09",
    "2018-10",
    "2018-11",
    "2018-12",
    "2019-01",
    "2019-02"
  ];

  const params = {
    category: category,
    for (date of yearlyData){
      { date:
        `${date}`
      }
    }
    ,
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

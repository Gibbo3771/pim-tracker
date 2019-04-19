const Crime = require("./models/crime.js");
const RequestHelper = require("./helpers/request_helper.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const allCrimes = [];
  // const crime = new Crime("https://data.police.uk/api/crimes-at-location");
  const rh = new RequestHelper("https://data.police.uk/api/crimes-at-location");
  rh.getCrimesAtLocation("2017-02", "52.629729", "-1.131592", 1).then(res => {
    for (crime of res) {
      console.log("this is a res", crime);
      const newCrime = new Crime(crime);
      allCrimes.push(newCrime);
    }
    console.log(allCrimes);
  });
});

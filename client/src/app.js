const Crime = require("./models/crime.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const crime = new Crime(
    "https://data.police.uk/api/crimes-at-location?date=2017-02&lat=-0.2948603&lng=51.4936526"
  );

  crime.get().then(res => {
    console.log(res);
  });
});

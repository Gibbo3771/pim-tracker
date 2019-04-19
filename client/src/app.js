const Crime = require("./models/crime.js");
const CrimeItemView = require("./views/crime_item_view.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const crime = new Crime("https://data.police.uk/api/crimes-at-location");
});

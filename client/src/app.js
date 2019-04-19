const Crime = require("./models/crime.js");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const crime = new Crime("https://data.police.uk/api/crimes-at-location");
});

const Crime = require("./models/crime.js");
const MapView = require("./views/map_view.js");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const crime = new Crime("https://data.police.uk/api/crimes-at-location");

  const map = new MapView();
  map.render();
});

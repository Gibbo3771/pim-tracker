const MapView = require("./views/map_view.js");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  const map = new MapView();
  map.render();
});

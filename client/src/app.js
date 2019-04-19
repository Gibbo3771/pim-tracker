const MapView = require("./views/map_view.js");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  console.log("JS loaded");

  require("./__test__/lat_long_testing.js");
  // require("./__test__/event_click_testing.js");
  const map = new MapView();
  map.render();
});

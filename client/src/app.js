const MapView = require("./views/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const PubSub = require("./helpers/pub_sub.js");
const AppContainer = require("./app_container.js");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  const map = new MapView();
  map.render();
  map.bindEvents();

  const app = new AppContainer();
  app.bindEvents();

  const listView = new CrimeListView();
  listView.bindEvents();
});

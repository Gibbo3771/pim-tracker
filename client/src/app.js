const AppContainer = require("./app_container");
const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const CategorisedCrime = require("./models/categorised_crime.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const Chart = require("./views/high_chart.js");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = new AppContainer();
  const cc = new CategorisedCrime();
  cc.bindEvents();
  appContainer.bindEvents();
  const map = new MapView();
  map.render();
  map.bindEvents();

  const listView = new CrimeListView();
  listView.bindEvents();

  const chart = new Chart();
  chart.bindEvents();
});

const AppContainer = require("./app_container");
const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const CrimeDetailView = require("./views/crime_detail_view");
require("leaflet");

document.addEventListener("DOMContentLoaded", () => {
  const appContainer = new AppContainer();
  appContainer.bindEvents();
  const map = new MapView();
  map.render();
  map.bindEvents();

  const listView = new CrimeListView();
  listView.bindEvents();
});

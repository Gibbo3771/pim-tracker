const AppContainer = require("./app_container");
const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const CategorisedCrime = require("./models/categorised_crime.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const CrimeDetailView = require("./views/crime_detail_view");
const AboutView = require("./views/about_view.js");
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

  const aboutView = new AboutView();
  document.getElementById("button-about").addEventListener("click", evt => {
    appContainer.handleAboutButtonClick(evt);
  });
  const chart = new Chart();
  chart.bindEvents();
});

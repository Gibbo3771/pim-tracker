const AppContainer = require("./app_container");
const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const CategorisedCrime = require("./models/categorised_crime.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const CrimeDetailView = require("./views/crime_detail_view");
const AboutView = require("./views/about_view.js");
const Chart = require("./views/high_chart.js");
const ButtonAbout = require("./components/button_about/button_about");
const DropdownDate = require("./components/dropdown_date/dropdown_date.js");
const { sixMonths } = require("./helpers/dater/dater.js");
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
  const chart = new Chart();
  chart.bindEvents();

  const buttonAbout = new ButtonAbout();
  const dropdownDate = new DropdownDate();
  let array = sixMonths().map(date => {
    return `${date.getFullYear()}-${date.getMonth() + 1}`;
  });
  array = array.splice(1, array.length);
  dropdownDate.update(array);
});

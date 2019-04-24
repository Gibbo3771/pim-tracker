const AppContainer = require("./app_container");
const MapView = require("./views/map_view/map_view.js");
const CrimeListView = require("./views/crime_list_view.js");
const CategorisedCrime = require("./models/categorised_crime.js");
const PubSub = require("./helpers/pub_sub.js");
const RequestHelper = require("./helpers/request_helper.js");
const CrimeDetailView = require("./views/crime_detail_view");
const AboutView = require("./views/about_view.js");
const PieChart = require("./views/high_chart/pie_chart");
const ButtonAbout = require("./components/button_about/button_about");
<<<<<<< HEAD
const DropdownDate = require("./components/dropdown_date/dropdown_date");
=======
const DropdownDate = require("./components/dropdown_date/dropdown_date.js");
>>>>>>> develop
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
  const pieChart = new PieChart();
  pieChart.bindEvents();

  const buttonAbout = new ButtonAbout();
  const dropdownDate = new DropdownDate();
});

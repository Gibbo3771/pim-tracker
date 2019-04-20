require("leaflet");
const PubSub = require("../helpers/pub_sub.js");

const MapView = function() {
  this.map = null;
  this.accessToken =
    "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA";
};

MapView.prototype.render = function() {
  this.map = L.map("map").setView([51.505, -0.09], 13);
  this.createTileLayer();
};

MapView.prototype.createTileLayer = function() {
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: this.accessToken
    }
  ).addTo(this.map);
};

MapView.prototype.bindEvents = function() {
  this.clickEvent();
  this.createMarker("51.50", "-0.099");
};

MapView.prototype.clickEvent = function() {
  function onMapClick(event) {
    const popup = L.popup();

    console.log(event.latlng);
    popup
      .setLatLng(event.latlng)
      .setContent("You clicked the map at " + event.latlng.toString());
    // .openOn(this.map) <-- doesn't seem to like this
  }

  this.map.on("click", onMapClick);
};

MapView.prototype.createMarker = function(lat, lng) {
  const marker = L.marker([lat, lng]);
  marker
    .bindPopup(`You've clicked here at ${lat} ${lng}`)
    .openPopup()
    .addTo(this.map);
};

module.exports = MapView;

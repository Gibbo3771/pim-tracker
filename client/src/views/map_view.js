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

MapView.prototype.createMarker = function(lat, lng) {
  const marker = L.marker([lat, lng]);
  marker
    .bindPopup(`You've clicked here at ${lat} ${lng}`)
    .openPopup() //doesn't open with the marker. must be clicked to get pop up
    .addTo(this.map);
};

MapView.prototype.clickEvent = function() {
  const popup = L.popup();
  function onMapClick(event) {
    console.log(event.latlng);
    console.log(popup);
    return popup.setLatLng(event.latlng);
    // .setContent("You clicked the map at " + event.latlng.toString()); //<-- doesn't work as expected from the quick start guide
    // .openOn(this.map); //<-- console errors with this
  }

  this.map.on("click", onMapClick);
};

MapView.prototype.bindEvents = function() {
  this.clickEvent();
  this.createMarker("51.50", "-0.099");
  this.getBounds(51.5, -0.099);
  this.makeRectangle("51.503", "-0.101", "51.502", "-0.098");
};

MapView.prototype.makeRectangle = function(lat1, lng1, lat2, lng2) {
  const bounds = [[lat1, lng1], [lat2, lng2]];
  L.rectangle(bounds, { color: "#ff7800", weight: 0.5 }).addTo(this.map);
  // below code zooms the map to the rectangle bounds, may need at some point
  // this.map.fitBounds(bounds);
};

MapView.prototype.getBounds = function(lat, lng) {
  const point = L.latLng(lat, lng);
  console.log(`This is ${lat} and ${lng} to 5 (metres)`, point.toBounds(5));
};

module.exports = MapView;

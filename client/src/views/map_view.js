require("leaflet");
const PubSub = require("../helpers/pub_sub.js");

const MapView = function() {
  this.map = null;
  this.accessToken =
    "pk.eyJ1Ijoic2llcnJhdGFuZ28zNCIsImEiOiJjanVvNW96bDcwbXN4NDRwcDhhcGV3YWx3In0.Sz0BPdrbZfoIjICX83oGhA";
  this.lat = 0;
  this.lng = 0;
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
  marker.bindPopup(`You've clicked here at ${lat} ${lng}`).addTo(this.map);
};

MapView.prototype.handleClickEvent = function(event) {
  const popup = L.popup();
  this.lat = event.latlng.lat;
  this.lng = event.latlng.lng;
  this.createMarker(this.lat, this.lng);
};

MapView.prototype.bindEvents = function() {
  this.map.on("click", evt => this.handleClickEvent(evt));
  this.getBounds(51.5, -0.099);
  this.createBoundingBox("51.503", "-0.101", "51.502", "-0.098");
};

MapView.prototype.createBoundingBox = function(lat1, lng1, lat2, lng2) {
  const bounds = [[lat1, lng1], [lat2, lng2]];
  L.rectangle(bounds, { color: "#ff7800", weight: 0.5 }).addTo(this.map);
  // below code zooms the map to the rectangle bounds, may need at some point
  // this.map.fitBounds(bounds);
};

MapView.prototype.getBounds = function(lat, lng) {
  const point = L.latLng(lat, lng);
  // console.log(`This is ${lat} and ${lng} to 5 (metres)`, point.toBounds(5));
};

module.exports = MapView;
